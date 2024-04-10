import pika
import RPi.GPIO as GPIO
import time



def blink_led(port_number) :
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(40, GPIO.OUT)

    p = GPIO.PWM(40, 1000)  
    p.start(100)  

    time.sleep(3)  

    p.stop()
    GPIO.cleanup()
    

def on_message_received(ch, method, properties, body):
    print(f"firstconsumer - received new message: {body}")
    print(type(body))

credentials = pika.PlainCredentials('wdzogqdg', 'wXMu5IswRerIF_TbIwvcaS6avxMlzAZK')
connection_parameters = pika.ConnectionParameters('goose.rmq2.cloudamqp.com',5672,'wdzogqdg',credentials)

connection = pika.BlockingConnection(connection_parameters)

channel = connection.channel()

channel.exchange_declare(exchange='pubsub', exchange_type='fanout')

queue = channel.queue_declare(queue='', exclusive=True)

channel.queue_bind(exchange='pubsub', queue=queue.method.queue)

channel.basic_consume(queue=queue.method.queue, auto_ack=True,
    on_message_callback=on_message_received)

print("Started Consuming")

channel.start_consuming()