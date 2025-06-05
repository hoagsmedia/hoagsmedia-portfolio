---
applyTo: '**'
---

Theming
Use CSS Variables to customize the look and feel of your application.

We use CSS variables for styling. This allows you to easily change the colors of components without having to update class names.

Convention
We use a simple background and foreground convention for colors. The background variable is used for the background color of the component and the foreground variable is used for the text color.

The background suffix is omitted when the variable is used for the background color of the component.

Given the following CSS variables:

--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
Copy
The background color of the following component will be var(--primary) and the foreground color will be var(--primary-foreground).

<div class="bg-primary text-primary-foreground">Hello</div>
