import smtplib
from email.mime.text import MIMEText

#people = (
#	('SARAH', 'LAMB', 'SARAH.LAMB@TELECITY.COM', 'TELECITY'),
#	('Chris', 'Rogers', 'chrisrogers@fluidata.co.uk', 'Fluidata Ltd'),
#	('Dan', 'Fisher', 'danfisher@fluidata.co.uk', 'Fluidata Ltd'),
#	('Simon', 'Stokes', 'simonstokes@fluidata.co.uk', 'Fluidata Ltd'),
#	('Matt', 'Bradley', 'matt@inventpartners.com', 'Invent Partners Ltd')
#)

people = []

def confirm(fromaddr, name, surname, email):
	message = MIMEText("Thank you for registering for IXLeeds 1. If you have any questions about the event or your registration please contact info@ixleeds.net")

	message['Subject'] = "IXLeeds 1"
	message['From'] = fromaddr
	message['To'] = "%s %s <%s>" % (name, surname, email)

	s = smtplib.SMTP('localhost')
	s.sendmail(fromaddr, [email], message.as_string())

def inform(fromaddr, toaddr, name, surname, email, organisation):
	data = {'name':name, 'surname':surname, 'organisation':organisation, 'email':email}

	message = MIMEText("""A new person registered for IXLeeds1.

%(name)s %(surname)s (%(email)s) from %(organisation)s is booked for both sessions""" % data)

	message['Subject'] = "IXLeeds 1"
	message['From'] = fromaddr
	message['To'] = toaddr
	
	s = smtplib.SMTP('localhost')
	s.sendmail(fromaddr, [toaddr], message.as_string())



for name, surname, email, organisation in people:
	confirm('info@ixleeds.net', name, surname, email)
	inform('info@ixleeds.net', 'events@ixleeds.net', name, surname, email, organisation)
