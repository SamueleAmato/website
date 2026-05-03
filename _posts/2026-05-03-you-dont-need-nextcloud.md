---
title: "When Nextcloud Is Overkill: A Simpler Approach to File Sync" 
date: 2026-05-03
lang: en
--------

Nextcloud is an open-source self-hosted suite that lets you build a private cloud for storage, file synchronization, and much more.

For years, I used it on my home server mainly for two reasons:

* Synchronizing files across all my devices, keeping a directory always up to date.
* Having a centralized copy of my files on the server, useful as a backup in case something goes wrong with my local machines.

In practice, the server always held the most up-to-date version of the files and distributed them to other devices.

## The problem

Over time, I realized that for this specific use case, Nextcloud is **overkill**.

Beyond file synchronization, it includes many additional features (calendar, notes, sharing, web UI, etc.) that I don’t actually use. This results in:

* more complexity
* higher resource usage
* more maintenance

## The solution

While looking for a simpler alternative, I came across Syncthing.

Syncthing is an open-source tool that synchronizes files in a **peer-to-peer** way, without requiring a central server or third-party services.

Each device communicates directly with the others and keeps files in sync automatically.

Some advantages:

* simple setup
* no dependency on external cloud services
* direct synchronization between devices
* automatic connection management (even without a public IP)

The setup is quick and well documented in the [official guide](https://docs.syncthing.net/intro/getting-started.html).

## Do you still need a server?

Yes—if you want to replicate exactly the same behavior you had with Nextcloud.

Syncthing is P2P, which means files are only synchronized between devices that are online at the same time.

Example:

* You modify a file on PC 1
* PC 2 is turned off
* If you shut down PC 1 before PC 2 turns on, the change won’t be transferred

To solve this, you can use a third device that is **always on** (for example, a server):

* it receives all changes
* stores them
* distributes them when other devices connect

This way you get:

* continuous synchronization
* a centralized copy of your files

## Syncthing limitations

Syncthing is not a full replacement for Nextcloud.

Some features are missing:

* advanced web interface for file management
* public link sharing
* integration with apps (calendar, notes, etc.)

If you need those, Nextcloud is still a solid choice.
