create table names(
	id serial not null primary key,
	namesbooked text    
);

create table daysAvailable (
	id serial not null primary key,
    waiter_id int,
    dayOfWeek text,
	foreign key (waiter_id) references names(id)
);

-- insert into names () values('User 1');
-- insert into names (namesBooked) values('User 2');
-- insert into names (namesBooked) values('User 3');
