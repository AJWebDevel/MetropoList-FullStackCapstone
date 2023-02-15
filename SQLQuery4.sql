USE [master]

If db_id('MyManager') IS NULL   
    CREATE DATABASE [MyManager]
GO

USE [MyManager]
GO

DROP TABLE IF EXISTS [ListTag];
DROP TABLE IF EXISTS [Note];
DROP TABLE IF EXISTS [Task];
DROP TABLE IF EXISTS [List];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];


GO



CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(28) UNIQUE NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(50) NOT NULL,
  [ProfileImageUrl] nvarchar(255) NOT NULL,
  [UserTypeId] int
)
GO

CREATE TABLE [List] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [IsPrivate] bit NOT NULL,
  [DateCreated] datetime NOT NULL,
  [IsImportant] bit NOT NULL,
  [ListName] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Task] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [ListId] int NOT NULL,
  [DateDue] datetime,
  [UserId] int NOT NULL,
  [IsImportant] bit NOT NULL,
  [Title] nvarchar(50) NOT NULL,
  [Description] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Note] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [UserId] int ,
  [DateCreated] datetime NOT NULL,
  [Text] nvarchar(500) NOT NULL,
  [ListId] int
)
GO

CREATE TABLE [ListTag] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [ListId] int NOT NULL,
  [TagId] int NOT NULL
)
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [TypeName] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [TagName] nvarchar(50) NOT NULL
)
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]) 
GO

ALTER TABLE [List] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id]) 
GO

ALTER TABLE [Task] ADD FOREIGN KEY ([ListId]) REFERENCES [List] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Task] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Note] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id]) 
GO

ALTER TABLE [Note] ADD FOREIGN KEY ([ListId]) REFERENCES [List] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [ListTag] ADD FOREIGN KEY ([ListId]) REFERENCES [List] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [ListTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id]) ON DELETE CASCADE
GO


