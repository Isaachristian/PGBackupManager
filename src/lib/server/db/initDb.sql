drop table if exists user;
drop table if exists session;
drop table if exists category;
drop table if exists server_config;

-- create users table
create table if not exists user
(
    id       integer primary key autoincrement,
    name     text    not null,
    email    text    not null unique,
    password text    not null,
    is_admin boolean not null default false,
    secret   text    not null,
    approved boolean not null default false,
    active   boolean not null default true
);

create table if not exists session
(
    id           integer primary key autoincrement,
    user_id      integer  not null,
    session_uuid text     not null,
    expires_at   datetime not null,
    foreign key (user_id) references user (id)
);

-- create server config table
create table if not exists category
(
    id      integer primary key autoincrement,
    user_id integer not null,
    name    text    not null,
    foreign key (user_id) references user (id)
)

create table if not exists server_config
(
    id                integer primary key autoincrement,
    category_id       integer not null,
    server_name       text    not null,
    connection_string text    not null,
    foreign key (category_id) references category (id)
);