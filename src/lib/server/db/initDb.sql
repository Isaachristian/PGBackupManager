-- create users table
create table if not exists user
(
    id       integer primary key autoincrement,
    name     text not null,
    email    text not null unique,
    password text not null
);

insert into user (name, email, password)
values ('Isaac Liljeros', 'isaacliljeros@intelliwake.com', 'Test1234');

-- create server config table
create table if not exists server_config
(
    id                integer primary key autoincrement,
    user_id           integer not null,
    server_name       text    not null,
    connection_string text    not null,
    foreign key (user_id) references user (id)
);