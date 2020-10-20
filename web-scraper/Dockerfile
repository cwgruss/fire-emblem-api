FROM python:3.7

RUN pip3 install pipenv

WORKDIR /usr/src/app

COPY requirements.txt .
COPY src/ .

RUN  pip install -r requirements.txt


EXPOSE 8000

CMD ["python" , "./server.py"]
