from authentication.models import ApiToken


def generate_token():
    import random
    import string
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=50))


def create_token(user):
    token = ApiToken.objects.create(user=user)
    token.token = generate_token()
    token.save()
    return token
