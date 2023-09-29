# Profiler

A very simple implementation of face recognition (called 'profiler' here because I like the game 'Watch Dogs').

## Installation

### Windows

#### For node server/api

1. Cd into server directory:
   ```powershell
       cd server
   ```
2. Install node dependencies and dev dependencies:
   ```powershell
       npm i
   ```

#### For python client/program (make sure pipenv is installed using pip)

1. Cd into client directory:
   ```powershell
       cd client
   ```
2. Create a virtual environment (and activate virtual environment):
   ```powershell
       pipenv shell
   ```
3. Install dependencies from requirements.txt:
   ```powershell
       pipenv install
   ```

### macOS

#### For node server/api

1. Cd into server directory:
   ```powershell
       cd server
   ```
2. Install node dependencies and dev dependencies:

   ```powershell
       npm i
   ```

#### For python client/program (make sure pipenv is installed using pip)

1. Cd into client directory:
   ```sh
       cd client
   ```
2. Create a virtual environment (and activate virtual environment):
   ```sh
       pipenv shell
   ```
3. Install dependencies from requirements.txt:
   ```sh
       pipenv install
   ```

### Linux

#### For node server/api

1. Cd into server directory:
   ```powershell
       cd server
   ```
2. Install node dependencies and dev dependencies:

   ```powershell
       npm i
   ```

#### For python client/program (make sure pipenv is installed using pip)

1. Cd into client directory:
   ```sh
       cd client
   ```
2. Create a virtual environment (and activate virtual environment):
   ```sh
       pipenv shell
   ```
3. Install dependencies from requirements.txt:
   ```sh
       pipenv install
   ```

## Configuration

1. Create a `.env` file in the root of client and server directory.

2. Add the following environment variables to the `.env` file for node server:

   ```python
    MONGO_URI = your_mongodb_uri
    APP_PORT = port_number
    FILE_OBJECT_NAME = name_of_the_key_for_files_in_form_data
    APP_MEDIA_PATH = path_to_directory_for_file_storage
   ```

3. Add the following environment variables to the `.env` file for python client:

   ```python
    APP_MEDIA_PATH = path_to_directory_for_file_storage
    MONGO_HOST  = mongo_db_host
    MONGO_PORT  = mongo_db_port
    MONGO_DATABASE = mongo_db_database_name
    MONGO_COLLECTION  = mongo_db_collection_name
   ```

4. When both terminals are open (and in the client dir virtual env is activated):

   #### To run the server

   ```sh
      npm run dev
   ```

   #### To run the client

   ```sh
      python3 __main__.py
   ```
