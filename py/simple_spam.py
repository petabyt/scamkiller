# this program generates a random string and sends a request to the URL appended by the string
# Goodbye scammers!
import string
import requests
import random

URL = "https://rblx.link:3000/analytics?t="
TOKEN_LEN = 360

def rand_token(length):
    chars = "QWERTYUIOPASDFGHJKLZXCVBNM" + string.digits
    token = ""

    for i in range(0, length):
        token += random.choice(chars)

    return token


def request(token):
    print("Sending random token with length: " + str(len(token)))

    req = requests.get(URL + token, verify=False) # no verification in case the server has a bad SSL certificate

i = 0
while True:
    request(rand_token(TOKEN_LEN))
    i += 1
    print(f"Finished request {i}")
