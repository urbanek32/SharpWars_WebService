def test_creating_user(user):
    response = user.create_user()
    assert response[0]['status'] == 201
    assert response[0]['message'] != ''
