import random
import string

class TestData:

    @staticmethod
    def get_random_email(prefix):
        return '{prefix}-{number}@test.com'.format(prefix=prefix, number=random.randint(0, 1000000))

    @staticmethod
    def get_random_string(size):
        return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(size))

    @staticmethod
    def get_random_string_with_prefix(prefix):
        return '{prefix}-{number}'.format(prefix=prefix, number=random.randint(0, 1000000))