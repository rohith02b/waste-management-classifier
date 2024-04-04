import pika

def on_message_received(ch, method, properties, body):
    print(f"firstconsumer - received new message: {body}")

credentials = pika.PlainCredentials('wdzogqdg', 'wXMu5IswRerIF_TbIwvcaS6avxMlzAZK')
connection_parameters = pika.ConnectionParameters('goose.rmq2.cloudamqp.com',5672,'wdzogqdg',credentials)

connection = pika.BlockingConnection(connection_parameters)

channel = connection.channel()

channel.exchange_declare(exchange='pubsub', exchange_type='fanout')

queue = channel.queue_declare(queue='', exclusive=True)

channel.queue_bind(exchange='pubsub', queue=queue.method.queue)

channel.basic_consume(queue=queue.method.queue, auto_ack=True,
    on_message_callback=on_message_received)

print("Starting Consuming")

channel.start_consuming()