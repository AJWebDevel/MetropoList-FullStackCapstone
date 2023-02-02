USE [MyManager]
GO

set identity_insert [UserType] on
insert into [UserType] ([Id], [TypeName]) 
VALUES (1, 'Admin'), (2, 'User');
set identity_insert [UserType] off

set identity_insert [UserProfile] on
insert into [UserProfile] ([Id], [FirebaseUserId], [FirstName], [LastName], [Email], [ProfileImageUrl], [UserTypeId]) VALUES (1, 'qjaErtHxToNySRXyHynWi80TmQk1', 'Admin', 'One', 'adminUser@mail.com', 'https://www.jessicagavin.com/wp-content/uploads/2020/07/how-to-cook-pasta-3-1200.jpg', 1 );
insert into [UserProfile] ([Id], [FirebaseUserId], [FirstName], [LastName], [Email], [ProfileImageUrl], [UserTypeId]) VALUES (2, 'PNXi2j2ujEci112RJUryxljHtaT2', 'User', 'One', 'user1@mail.com', 'https://i.kym-cdn.com/entries/icons/original/000/001/180/5018904-clippy-black-tar-heroin-memes-png-image-transparent-png-free-clippy-transparent-820_502.png', 2 );
insert into [UserProfile] ([Id], [FirebaseUserId], [FirstName], [LastName], [Email], [ProfileImageUrl], [UserTypeId]) VALUES (3, 'EDbPnM5wEEUTLqHxC0dmYZXWpv33', 'Aloysius', 'Inconspicuous', 'regular@user.com', 'https://media.entertainmentearth.com/assets/images/c6f07ef585f44121b3a63f6992ab30a7xl.jpg', 2 );
set identity_insert [UserProfile] off

set identity_insert [List] on
insert into [List] ([Id], [UserId], [IsPrivate], [DateCreated], [IsImportant], [ListName]) VALUES (1, 1, 0, '01/31/23', 0, 'Example List 1');
insert into [List] ([Id], [UserId], [IsPrivate], [DateCreated], [IsImportant], [ListName]) VALUES (2, 2, 0, '01/30/23', 1, 'Example User List 1');
insert into [List] ([Id], [UserId], [IsPrivate], [DateCreated], [IsImportant], [ListName]) VALUES (3, 3, 0, '02/01/23', 1, 'Homework');
set identity_insert [List] off

set identity_insert [Task] on 
insert into [Task] ([Id], [ListId], [DateDue], [UserId], [IsImportant], [Title], [Description]) VALUES (1, 1, '02/22/2023', 1, 0, 'Example Task for Admin', 'This task is an example task for an admin.');
insert into [Task] ([Id], [ListId], [DateDue], [UserId], [IsImportant], [Title], [Description]) VALUES (2, 2, '02/01/2023', 2, 0, 'Example Task for User', 'This task is an example task for a user.');
insert into [Task] ([Id], [ListId], [DateDue], [UserId], [IsImportant], [Title], [Description]) VALUES (3, 3, '02/03/2023', 3, 1, 'Read Chapter 18', 'Reach ch. 18. in "Everyday Guide to Microbiological Physics.');
set identity_insert [Task] off

set identity_insert [Note] on 
insert into [Note] ([Id], [UserId], [DateCreated], [Text], [ListId]) VALUES (1, 1, '01/31/2023', 'This is an example of a note for an admin that goes in the app.', 1);
insert into [Note] ([Id], [UserId], [DateCreated], [Text], [ListId]) VALUES (2, 2, '02/23/2023', 'This is an example of a note for a user that goes in the app.', 2);
insert into [Note] ([Id], [UserId], [DateCreated], [Text], [ListId]) VALUES (3, 3, '01/30/2023', 'In ch. 18, skip pages 101-114.', 3);
set identity_insert [Note] off

set identity_insert [Tag] on 
insert into [Tag] ([Id], [TagName]) VALUES (1, 'Example Tag')
insert into [Tag] ([Id], [TagName]) VALUES (2, 'Medical')
insert into [Tag] ([Id], [TagName]) VALUES (3, 'School')
set identity_insert [Tag] off

set identity_insert [ListTag] on 
insert into [ListTag] ([Id], [ListId], [TagId]) VALUES (1, 1, 1)
insert into [ListTag] ([Id], [ListId], [TagId]) VALUES (2, 2, 1)
insert into [ListTag] ([Id], [ListId], [TagId]) VALUES (3, 3, 3)
set identity_insert [ListTag] off

