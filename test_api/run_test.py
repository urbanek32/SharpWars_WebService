from tests import users_tests
from model.user import User

def main():
    # User tests
    user = User()
    users_tests.test_creating_user(user)


if __name__ == '__main__':
    main()