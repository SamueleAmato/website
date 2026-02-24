---
title: "Stop Writing if in Bash"
date: 2026-02-24
hn_id: td 
---

Don’t act as though Bash is Python, or C. The most frequent trouble
with shell scripts is using too many `if` statements for simple control.
Although you’ll need conditional logic at times, Bash has its own,
better way – right in the command line – of doing this: exit codes and
logical operators.

## The Basics

Each command in Bash gives back an exit code when it’s done. `0` means
it worked, and anything else means it didn’t. You can link command
running by using these codes with logical operators, and so get rid of
long `if` blocks.

-   `;` (Semicolon): Runs the second command no matter what the first
    command did. It is the same as a new line.

-   `&&` (AND): Runs the second command only if the first command worked
    (exit code `0`).

-   `||` (OR): Runs the second command only if the first command failed
    (non-zero exit code).

## Making Conditional Assignments Better

It’s usual to see if a variable has been set, and if not, give it a
default.

### The Long Way:

``` bash
if [ -z "$EDITOR" ]; then
    EDITOR="vim"
fi
```

### The Bash Way:

``` bash
[ -z "$EDITOR" ] && EDITOR="vim"
```

In this, `[ -z "$EDITOR" ]` is a command that returns true (`0`) if the
variable is empty. The `&&` operator makes sure the assignment happens
only when that’s the case. This turns three lines of standard code into
one line that’s easy to read.

## Linking Command Flow

This works for involved workflows with several things that have to be
done. Rather than putting `if` statements inside each other to see if
each step worked, use running chains.

### The Nested Problem:

``` bash
func1
if [ $? -eq 0 ]; then
    func2
    if [ $? -eq 0 ]; then
        func3
    else
        handle_error
    fi
fi
```

### The Logical Chain:

``` bash
func1 && func2 && func3 || handle_error
```

In this structure, execution flows linearly. If `func1` succeeds,
`func2` runs. If `func2` succeeds, `func3` runs. If any command in the
`&&` sequence fails, the chain breaks immediately, skipping the
remaining `&&` steps and triggering the `||` block to handle the failure
(e.g., cleanup or error logging).

## Conclusion

Script elegance lies in leveraging the shell's native behavior. 

Use `if` when it genuinely improves clarity.

For everything else, logic chains are often the cleaner, more idiomatic
choice.
