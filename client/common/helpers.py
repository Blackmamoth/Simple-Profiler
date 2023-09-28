from pymongo import MongoClient
from common.model import Profile
from common.environment import Environment
import face_recognition
import os
import cv2
from dataclasses import asdict


def findUserProfile(filename: str) -> Profile | None:
    client = MongoClient(host=Environment.MONGO_HOST,
                         port=Environment.MONGO_PORT)
    db = client[Environment.MONGO_DATABASE]
    if db is not None:
        profile_collection = db[Environment.MONGO_COLLECTION]
        user_profile = profile_collection.find_one(
            {"fileNames": {"$in": [filename]}},
            {'name': 1, 'age': 1, 'dob': 1, 'description': 1}
        )
        if user_profile is None:
            return
        profile = Profile(name=user_profile['name'],
                          age=user_profile['age'],
                          dob=user_profile['dob'],
                          description=user_profile['description']
                          )
        return profile


def get_known_face_details() -> list[list[str], list[str]]:
    known_face_encoding = []
    known_face_names = []
    mediaPath = Environment.APP_MEDIA_PATH
    files = os.listdir(mediaPath)
    for file in files:
        image = face_recognition.load_image_file(f'{mediaPath}/{file}')
        face_encoding = face_recognition.face_encodings(image)[0]
        known_face_encoding.append(face_encoding)
        profile = findUserProfile(file)
        if profile is not None:
            known_face_names.append(f'{profile.name}, {profile.age}')
        else:
            known_face_encoding.append("Unknown Person")
    return [known_face_encoding, known_face_names]


def start_capture():
    video_capture = cv2.VideoCapture(0)
    known_face_encodings, known_face_names = get_known_face_details()
    while True:
        ret, frame = video_capture.read()
        face_locations = face_recognition.face_locations(frame)
        face_encodings = face_recognition.face_encodings(frame, face_locations)
        for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
            matches = face_recognition.compare_faces(
                known_face_encodings, face_encoding)
            name = "Unknown person"
            if True in matches:
                first_match_index = matches.index(True)
                name = known_face_names[first_match_index]
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom -
                        6), font, 0.5, (255, 255, 255), 1)
        cv2.imshow('Video', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    video_capture.release()
    cv2.destroyAllWindows()
