## TOP Calculator
> [!IMPORTANT]
> This calculator processes calculations in this specific order:
> - Division
> - Multiplication
> - Addition
> - Subtraction
> - Modulo

> [!NOTE]
> This order of operations may be changed, but don't look for it!

This is one of the many calculator projects previously done by many other developers.

What makes this unique is that it showcases many skills implemented regardless of whether the calculator works as a real one...

## Features
1) Add, subtract, divide and multiply integers and floats.
2) Can add multiple operations in sequence.
3) Can use modulo to get remainder.
4) Can back-space to remove the latest entry.
5) Can clear the entire screen.
6) Follows order of operations *specified*.

## Logging
Currently **logging** is used in `process.js`.

A logging stream is initialised everytime the equal button is pressed,
where all processes leading to the resulting answer is displayed in order for clear
following of steps.

> [!TIP]
> To view logging messages, press `F12` on Chrome.
> Alternatively, `right-click + Inspect` to view DevTools
> All messages are displayed in the `Console` Tab

e.g.
A calculation of **9 + 9 - 8 * 2** would result in:

```
Starting calculation process...
MEM: [9, '+', 9, '-', 8, '*', 2]
```

A tokenised form of the calculation is displayed to showcase how it was processed.

```
proccess[*]
(5) [9, '+', 9, '-', 16]

proccess[+]
(3) [18, '-', 16]

proccess[-]
[2]
```

Each operation that had to be calculated is shown as a process,
and the resulting tokens are showcased.

As seen, it is showing the calculation process from top to bottom, until the final answer is shown at the **very** bottom.

That last array content is shown on the calculator display.
