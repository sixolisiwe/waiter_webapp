create table waiter(
	id serial not null primary key,
	username text    
);

create table weekdays(
	id serial not null primary key,
    -- waiter_id int,
    dayOfWeek text
	-- foreign key (waiter_id) references names(id)
);

create table shift(
	id serial not null primary key,
	user_id int,
	day_id int,
	foreign key (user_id) references waiter(id),
	foreign key (day_id) references weekdays(id)  
);
insert into weekdays (dayOfWeek) values('Monday');
insert into weekdays (dayOfWeek) values('Tuesday');
insert into weekdays (dayOfWeek) values('Wednesday');
insert into weekdays (dayOfWeek) values('Thursday');
insert into weekdays (dayOfWeek) values('Friday');
insert into weekdays (dayOfWeek) values('Saturday');
insert into weekdays (dayOfWeek) values('Sunday');

