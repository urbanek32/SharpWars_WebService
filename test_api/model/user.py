from test_utils.test_data import TestData
import ConfigParser
import requests
import json

config = ConfigParser.RawConfigParser()
config.read('config.ini')

class User:
    def __init__(self, username=None, password=None, name=None, surname=None, email=None, location=None, hobby=None):
        self.username = username if username != None else TestData.get_random_email(prefix='test-api-username')
        self.password = password if password != None else TestData.get_random_string(10)
        self.name = name if name != None else TestData.get_random_string_with_prefix(prefix='test-api-name')
        self.surname = surname if surname else TestData.get_random_string_with_prefix('test-api-surname')
        self.email = email if email else TestData.get_random_email('test-api-email')

    def create_user(self):
        url = config.get('environment', 'url') + '/api/users/add'
        body = {
            'username': self.username,
            'password': self.password,
            'name': self.name,
            'surname': self.surname,
            'email': self.email
        }
        print('Creating user:\n'
                     'url: {url}\n'
                     'body: {body}\n'
                     .format(url=url, body=body))
        response = requests.post(url, body)
        print('Response: {response}'.format(response=response.text))
        return json.loads(response.text)
