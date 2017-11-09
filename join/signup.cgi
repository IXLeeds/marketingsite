#!/usr/bin/perl

use strict;
use MIME::Lite;
use JSON;
use Data::Dumper;

my $rb = decode_json(join '', <>);

my @error;

my @check = (
	["company.name"],
	["company.address1"],
	["company.city"],
	["company.country"],
	["connection.site"],
	["connection.type"],
	["connection.peering_contact"],
	["connection.noc_contact"],
	["connection.as_number", qr/^\d+$/],
	["connection.as_set", qr/(^$|^AS-)/],
	["contact.admin.name"],
	["contact.admin.email"],
	["contact.billing.name"],
	["contact.billing.email"],
	["contact.tech.name"],
	["contact.tech.email"],
);

foreach (@check) {
	my @r = split /\./, $_->[0];
	my $v = $rb;
	foreach (@r) {
		$v = $v->{$_};
	}
	if ($_->[1]) {
		if ($v !~ m/$_->[1]/) {
			push @error, $_->[0];
		}
	} else {
		if (! length $v) {
			push @error, $_->[0];
		}
	}
}

if (@error) {
	print "Status: 400 Bad Request\n";
	print "Content-type: application/json\n\n";
	print to_json({ fields => \@error });
	exit 0;
}

my $msg = MIME::Lite->new(
	From => 'signup@www.ixleeds.net',
	To => 'execs@ixleeds.net',
	Subject => 'Signup form submission',
	Type => 'multipart/mixed'
);

my $signup = <<EOF;
Signup received:

Company:       $rb->{company}{name}
Address:       $rb->{company}{address1}
               $rb->{company}{address2}
               $rb->{company}{city}
               $rb->{company}{county}
               $rb->{company}{postcode}
               $rb->{company}{country}

Connnection:   $rb->{connection}{type}
Site:          $rb->{connection}{site}
Rack location: $rb->{connection}{rack}

Peering:       $rb->{connection}{peering_contact}
NOC:           $rb->{connection}{noc_contact}
ASN:           $rb->{connection}{as_number}
AS set:        $rb->{connection}{as_set}
DNS PTR:       $rb->{connection}{dns_ptr}

Admin name:    $rb->{contact}{admin}{name}
Admin email:   $rb->{contact}{admin}{email}
Admin phone:   $rb->{contact}{admin}{phone}

Tech name:     $rb->{contact}{tech}{name}
Tech email:    $rb->{contact}{tech}{email}
Tech phone:    $rb->{contact}{tech}{phone}

Billing name:  $rb->{contact}{billing}{name}
Billing email: $rb->{contact}{billing}{email}
Billing phone: $rb->{contact}{billing}{phone}



All submitted data:
EOF

$signup .= to_json($rb, { pretty => 1 });

$msg->attach(
	Type => 'TEXT',
	Data => $signup
);

$msg->send;

print "Status: 204 No Response\n\n";

exit 0;
