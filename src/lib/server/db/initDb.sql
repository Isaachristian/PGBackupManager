drop table if exists user;
drop table if exists session;
drop table if exists server_config;

-- create users table
create table if not exists user
(
    id       integer primary key autoincrement,
    name     text not null,
    email    text not null unique,
    password text not null,
    is_admin boolean not null default false
);

create table if not exists session
(
    id integer primary key autoincrement ,
    user_id integer not null,
    session_uuid text not null,
    expires_at datetime not null,
    foreign key (user_id) references user (id)
);

-- create server config table
create table if not exists server_config
(
    id                integer primary key autoincrement,
    user_id           integer not null,
    server_name       text    not null,
    connection_string text    not null,
    foreign key (user_id) references user (id)
);