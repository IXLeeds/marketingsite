CREATE TABLE category (
	id integer,
	name text
);

INSERT INTO category VALUES (1,'Peering');
INSERT INTO category VALUES (2,'Technical');
INSERT INTO category VALUES (3,'Administrative');
INSERT INTO category VALUES (4,'Financial');
INSERT INTO category VALUES (5,'Commercial');



CREATE TABLE members (
	id integer,
	name text,
	nick text,
	asn integer,
	url text
);

INSERT INTO members VALUES ( 0, 'IXLeeds Limited','ixleeds',51526,'http://www.ixleeds.net/');
INSERT INTO members VALUES (10, '(AQ) Limited','aql', 33920,'http://www.aql.com');
INSERT INTO members VALUES (11, 'Sleek Networks','sleek', 44009,'http://www.sleek.net/');
INSERT INTO members VALUES (12, 'Exa Networks','exa', 30740,'http://www.exa-networks.co.uk/');
INSERT INTO members VALUES (13, 'York Data Services','yds', 43013,'http://www.yorkdataservices.com/');
INSERT INTO members VALUES (14, 'Andrews & Arnold','aaisp', 20712,'http://aaisp.net.uk/');
INSERT INTO members VALUES (15, 'IOKO','ioko', 30914,'http://www.ioko.net/iokoHome.html');
INSERT INTO members VALUES (16, 'Fluidata', 'fluidata', 39545,'http://www.fluidata.co.uk/');
INSERT INTO members VALUES (17, 'JANET', 'janet', 786,'http://www.ja.net/');
INSERT INTO members VALUES (18, 'Vaioni Group', 'vaioni', 35575,'http://www.vaioni.com/');
INSERT INTO members VALUES (19, 'Ask4', 'ask4', 41230,'http://www.ask4.com/');
INSERT INTO members VALUES (20, 'Bytemark', 'bytemark', 35425,'http://www.bytemark.co.uk');
INSERT INTO members VALUES (21, 'Phoenix IT', 'phoenix', 8613,'http://www.phoenix.co.uk');
INSERT INTO members VALUES (22, 'Metronet', 'metronet', 42973,'http://www.metronet-uk.com');
INSERT INTO members VALUES (23, 'IXReach', 'ixreach', 43531,'http://www.ixreach.net');
INSERT INTO members VALUES (24, 'Akamai', 'akamai', 20940,'http://www.akamai.com');
INSERT INTO members VALUES (25, 'Web Fusion', 'webfusion', 20738,'http://www.webfusion.com');



CREATE TABLE address (
	member integer,
	street text,
	city text,
	county text,
	postcode text,
	country text,
	FOREIGN KEY(member) REFERENCES members(id)
);

-- AQL
INSERT INTO address VALUES (10, '13-15 Hunslet road','Leeds','West Yorkshire','LS10 1JQ','United Kingdom');
-- EXA
INSERT INTO address VALUES (12, '27-29 mill field road\ncottingley business park','Bingley','West Yorkshire','BD16 1PY','United Kingdom');
INSERT INTO address VALUES (23, 'Tempus Court\nBellfield Road','High Wycombe','Buckinghamshire','HP13 5HA','United Kingdom');



CREATE TABLE identity (
	id integer,
	name text,
	role boolean
);

-- EXA
INSERT INTO identity VALUES (1,'Thomas Mangin','false');
INSERT INTO identity VALUES (2,'Exa Peering','true');
INSERT INTO identity VALUES (3,'Exa NOC','true');
INSERT INTO identity VALUES (4,'Exa Accounts','true');
-- AQL
INSERT INTO identity VALUES (5,'Adam Beaumont','false');
INSERT INTO identity VALUES (6,'Craig Hopkins','false');
INSERT INTO identity VALUES (7,'Colin Ward','false');
INSERT INTO identity VALUES (8,'AQL Peering Team','true');
INSERT INTO identity VALUES (9,'AQL Sales','true');
INSERT INTO identity VALUES (10,'Samantha Hogg','false');

--INSERT INTO identity VALUES (5,'Andy Davidson','false');
--INSERT INTO identity VALUES (6,'Mark Fordyce','false');
--INSERT INTO identity VALUES (7,'Emma Frost','false');

INSERT INTO identity VALUES (11,'IXReach Peering','true');
INSERT INTO identity VALUES (12,'IXReach NOC','true');
INSERT INTO identity VALUES (13,'IXReach Sales','false');
INSERT INTO identity VALUES (14,'Carol-Anne Alcock','false');




CREATE TABLE email (
	identity integer,
	priority integer,
	address text,
	FOREIGN KEY(identity) REFERENCES identity(id)
);

-- EXA
INSERT INTO email VALUES (1,1,'thomas.mangin@exa-networks.co.uk');
INSERT INTO email VALUES (2,1,'peering@exa-networks.co.uk');
INSERT INTO email VALUES (3,1,'noc@exa-networks.co.uk');
INSERT INTO email VALUES (3,2,'richard.halfpenny@exa-networks.co.uk');
INSERT INTO email VALUES (3,3,'daniel.piekacz@exa-networks.co.uk');
INSERT INTO email VALUES (3,4,'thomas.mangin@exa-networks.co.uk');
INSERT INTO email VALUES (4,1,'accounts@exa-networks.co.uk');
-- AQL
INSERT INTO email VALUES (5,1,'adam.beaumont@uk.aql.com');
INSERT INTO email VALUES (6,1,'craig.hopkins@uk.aql.com');
INSERT INTO email VALUES (7,1,'colin.ward@uk.aql.com');
INSERT INTO email VALUES (8,1,'peering@uk.aql.com');
INSERT INTO email VALUES (9,1,'sales@uk.aql.com');
INSERT INTO email VALUES (10,1,'samantha.hogg@uk.aql.com');
-- IXReach
INSERT INTO email VALUES (11,1,'peering@ixreach.com');
INSERT INTO email VALUES (12,1,'noc@ixreach.com');
INSERT INTO email VALUES (13,1,'enquiries@ixreach.com');
INSERT INTO email VALUES (14,1,'accounts@ixreach.com');

CREATE TABLE phone (
	identity integer,
	priority integer,
	number text,

	FOREIGN KEY(identity) REFERENCES identity(id)
);

-- EXA
INSERT INTO phone VALUES (1,1,'00 44 845 145 1234');
INSERT INTO phone VALUES (1,2,'00 44 7 814 840 662');
INSERT INTO phone VALUES (2,1,'00 44 845 145 1234');
INSERT INTO phone VALUES (3,1,'00 44 845 145 1234');
INSERT INTO phone VALUES (4,1,'00 44 845 145 1234');
-- AQL
INSERT INTO phone VALUES (5,1,'00 44 11 33 20 30 40');
INSERT INTO phone VALUES (6,1,'00 44 11 33 20 30 00');
INSERT INTO phone VALUES (6,2,'00 44 11 33 20 30 40');
INSERT INTO phone VALUES (7,1,'00 44 11 33 20 33 03');
INSERT INTO phone VALUES (7,2,'00 44 11 33 20 30 40');
INSERT INTO phone VALUES (8,1,'00 44 11 33 20 30 40');
INSERT INTO phone VALUES (9,1,'00 44 11 33 20 30 40');
INSERT INTO phone VALUES (10,1,'00 44 11 33 20 30 40');
-- IXReach
INSERT INTO phone VALUES (11,1,'00 44 845 2178577');
INSERT INTO phone VALUES (12,1,'00 44 845 2178577');
INSERT INTO phone VALUES (13,1,'00 44 845 0130845');
INSERT INTO phone VALUES (14,1,'00 44 845 0130845');


CREATE TABLE contact (
	member integer,
	category integer,
	priority integer,
	identity integer,

	FOREIGN KEY(member) REFERENCES members(id),
	FOREIGN KEY(category) REFERENCES category(id),
	FOREIGN KEY(identity) REFERENCES identity(id)
);

-- AQL
INSERT INTO contact VALUES (10,1,1,8);
INSERT INTO contact VALUES (10,2,1,8);
INSERT INTO contact VALUES (10,2,2,6);
INSERT INTO contact VALUES (10,3,1,6);
INSERT INTO contact VALUES (10,4,1,7);
INSERT INTO contact VALUES (10,5,1,9);

-- EXA
INSERT INTO contact VALUES (12,1,1,2);
INSERT INTO contact VALUES (12,2,1,3);
INSERT INTO contact VALUES (12,2,2,1);
INSERT INTO contact VALUES (12,3,1,1);
INSERT INTO contact VALUES (12,4,1,4);
INSERT INTO contact VALUES (12,5,1,1);

-- IXReach
INSERT INTO contact VALUES (23,1,1,11);
INSERT INTO contact VALUES (23,2,1,12);
INSERT INTO contact VALUES (23,3,1,12);
INSERT INTO contact VALUES (23,4,1,14);
INSERT INTO contact VALUES (23,5,1,13);


CREATE TABLE switch (
	id integer,
	name text
);

INSERT INTO switch VALUES (1, 'rx1.dc2.aql');

CREATE TABLE connector (
	id integer,
	name text
);

INSERT INTO connector VALUES (1,'copper');
INSERT INTO connector VALUES (1,'fiber');

CREATE TABLE linecard (
	id integer,
	number integer,
	switch integer,
	capacity integer,
	speed integer,
	FOREIGN KEY(switch) REFERENCES switch(id)
);

INSERT INTO linecard VALUES (1,1,1, 4,10000);
INSERT INTO linecard VALUES (2,2,1, 4,10000);
INSERT INTO linecard VALUES (3,3,1, 4,10000);
INSERT INTO linecard VALUES (4,4,1, 4,10000);
INSERT INTO linecard VALUES (5,5,1,24, 1000);
INSERT INTO linecard VALUES (6,6,1,24, 1000);
INSERT INTO linecard VALUES (7,7,1,24, 1000);
INSERT INTO linecard VALUES (8,8,1,24, 1000);

CREATE table presentation (
	id integer,
	name text
);

-- INSERT INTO presentation VALUES (0,'100 Mb');
INSERT INTO presentation VALUES (1,'1 Gb');
INSERT INTO presentation VALUES (2,'10 Gb');
INSERT INTO presentation VALUES (3,'LX');
INSERT INTO presentation VALUES (4,'SX');
INSERT INTO presentation VALUES (5,'Xenpack');

CREATE TABLE port (
	linecard integer,
	number integer,
	presentation integer,
	member integer,

	FOREIGN KEY(linecard) REFERENCES linecard(id),
	FOREIGN KEY(presentation) REFERENCES presentation(id),
	FOREIGN KEY(member) REFERENCES members(id)
);

INSERT INTO port VALUES (5,1,1,0);
INSERT INTO port VALUES (5,2,1,0);

INSERT INTO port VALUES (5,10,1,10);
INSERT INTO port VALUES (5,11,1,11);
INSERT INTO port VALUES (5,12,1,12);
INSERT INTO port VALUES (5,13,1,13);
INSERT INTO port VALUES (5,14,1,14);
INSERT INTO port VALUES (5,15,1,15);
INSERT INTO port VALUES (5,16,1,16);
INSERT INTO port VALUES (5,17,1,17);
INSERT INTO port VALUES (5,18,1,18);
INSERT INTO port VALUES (5,19,1,19);
INSERT INTO port VALUES (5,20,1,20);
INSERT INTO port VALUES (5,21,1,21);
INSERT INTO port VALUES (5,22,1,22);
INSERT INTO port VALUES (1,2,2,23);
INSERT INTO port VALUES (1,1,2,24);
INSERT INTO port VALUES (7,4,1,25);

CREATE TABLE vlan (
	id integer,
	name text
);

INSERT INTO vlan VALUES (400,'quarantine');
INSERT INTO vlan VALUES (401,'peering 1.5k');
INSERT INTO vlan VALUES (402,'peering 9k');

CREATE TABLE security (
	linecard integer,
	port integer,
	vlan integer,
	protocol integer,
	ip text,

	FOREIGN KEY(linecard) REFERENCES linecard(id),
	FOREIGN KEY(vlan) REFERENCES vlan(id),
	FOREIGN KEY(port) REFERENCES port(number)
);

INSERT INTO security VALUES (5,1,2,4,'109.239.97.53');
INSERT INTO security VALUES (5,2,3,4,'192.0.2.2');
INSERT INTO security VALUES (5,2,3,4,'192.0.2.202');

INSERT INTO security VALUES (5,10,401,4,'91.217.231.10');
INSERT INTO security VALUES (5,11,401,4,'91.217.231.11');
INSERT INTO security VALUES (5,12,401,4,'91.217.231.12');
INSERT INTO security VALUES (5,13,401,4,'91.217.231.13');
INSERT INTO security VALUES (5,14,401,4,'91.217.231.14');
INSERT INTO security VALUES (5,15,401,4,'91.217.231.15');
INSERT INTO security VALUES (5,16,401,4,'91.217.231.16');
INSERT INTO security VALUES (5,17,401,4,'91.217.231.17');
INSERT INTO security VALUES (5,18,401,4,'91.217.231.18');
INSERT INTO security VALUES (5,19,401,4,'91.217.231.19');
INSERT INTO security VALUES (5,20,401,4,'91.217.231.20');
INSERT INTO security VALUES (5,21,401,4,'91.217.231.21');
INSERT INTO security VALUES (5,22,401,4,'91.217.231.22');
INSERT INTO security VALUES (1,2,401,4,'91.217.231.23');
INSERT INTO security VALUES (1,1,401,4,'91.217.231.24');
INSERT INTO security VALUES (7,4,401,4,'91.217.231.26');

INSERT INTO security VALUES (5,10,402,4,'91.234.18.10');
INSERT INTO security VALUES (5,12,402,4,'91.234.18.12');

INSERT INTO security VALUES (5,10,401,6,'2001:7F8:67::8480:1');
INSERT INTO security VALUES (5,12,401,6,'2001:7F8:67::7814:1');
INSERT INTO security VALUES (5,14,401,6,'2001:7F8:67::50E8:1');
INSERT INTO security VALUES (5,17,401,6,'2001:7F8:67::312:1');
INSERT INTO security VALUES (5,20,401,6,'2001:7F8:67::8A61:1');
INSERT INTO security VALUES (5,21,401,6,'2001:7F8:67::21A5:1');
INSERT INTO security VALUES (5,22,401,6,'2001:7F8:67::A7DD:1');

INSERT INTO security VALUES (5,12,402,6,'2001:7F8:67:9::7814:1');
