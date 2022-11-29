# Development

### Link to Deployed Website
[https://uiux-development-assignment.vercel.app](https://uiux-development-assignment.vercel.app)

### Goal and Value of the Application
This application is a bakery’s menu page. Users can use the filtering and sorting functions to browse and find the items they need, and add items to a shopping cart.

### Usability Principles Considered
The webpage provides two types of filters to serve users’ different needs. Their filtering logic is thoroughly considered when designing their functionality. All filters are not selected by default, and all items are shown.

The *Type* filter is an OR filter because type values are mutually exclusive. A bakery item cannot be a *bread* and a *cake* simultaneously. Users would expect to see items in both categories when they select those two filters.

The *Dietary* filter is an AND filter. The values are not mutually exclusive, and users would expect the filtered items to meet all the restrictions they selected.

_References_:

[The Mind-Bending Logic of User Interface Filtering–And How to Tailor It to Your Product](https://madeintandem.com/blog/mind-bending-logic-user-interface-filtering-tailor-product/)

[E-Commerce Filter UX: Allow Users to Combine Multiple Filtering Values of the Same Type — an ‘OR’ logic (32% of Sites Don’t)](https://baymard.com/blog/allow-applying-of-multiple-filter-values)

### Organization of Components
Two components are used in this application. `Sidebar.js` contains all the sorting and filtering checkboxes, as well as the shopping cart, and is placed on the left side of the page. `BakeryItem.js` is a card that shows information of a bakery item. It is applied through a map function to display multiple bakery items on the page.

### How Data is Passed Down Through Components
States are placed in the parent component `App.js`, and passed down to components via props.

Four states are used for the application. The `sort` state uses a string value that indicates the currently selected sorting method. The `type` and `dietary` state use objects to keep track of the toggled filters. The `cart` state uses an array to track the items added to the shopping cart.

The original bakery data is processed through `getDisplayData()`, which first applies both filters to the data, then applies the sorting, and returns the data for display array `displayData`. The BakeryItem component is mapped on `displayData`.

### How the User Triggers State Changes
The user triggers state changes when they toggle the checkboxes and/or buttons. Functions `handle___Change()` are called, which will make a new state and call the corresponding `setState()` function to update the state.
