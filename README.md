# Food Order System
## Demo
https://lightlai813.github.io/food-order-system/

## File/Folder structure
- .github
    - workflows
        - deploy.yml: Responsible for configuring the Github Actions workflow process to trigger deployment to Github pages when pushing to the `main` branch.
- src
    - components
        - Alert: Used to display system messages, controlled through Redux.
        - Button
        - Loading: Display loading screen while waiting for API response, controlled through Redux.
        - PopUpWindow: Responsible for handling floating windows, ensuring DOM hierarchy is below <body /> using `ReactDOM.createPortal` to avoid being covered by other DOM elements.
        - QuantityModifier: used to adjust item quantity.
    - store
        - alertSlice: Responsible for managing message status of `<Alert />`.
        - loadingSlice: Responsible for managing message status of `<Loading />`.
        - cartSlice: Responsible for managing the state of the shopping cart, including the currently selected items and whether the cart list is displayed.
        - itemSlice: Responsible for managing the data state of categories and items.
        - fetchCategorisAndItems: Responsible for making API requests for categories and items data.
    - utils
        - global.constants.d.ts: Declare global constants and types.
        - items.constants.d.ts: Declare Category and Items' types.
        - uniqueID.ts: Responsible for generating a UID for this browser and storing it in localStorage. Subsequently, when making API calls, include this UID so that the server can identify the user.
    - views
        - Menu: Display food list.
        - History: Display order history.
        - Cart: Display cart list.
        - Error: Responsible for displaying error messages when errors are caught using `react-error-boundary`.
        
## API Server
Built using Google Apps Script and Google Sheets.
Google Sheets: https://docs.google.com/spreadsheets/d/1mrcD0T3-G1Tag9SrHVz-_qgecsUKb8d2HzN_PAIYap8/edit#gid=1606857954
Google Apps Script: https://script.google.com/u/0/home/projects/1uOtwb6lqCQcijygAhwntVMcJZG9crcZmA7QkeO1L-_quAGQhQGfBfZuz/edit

#### Pros.
1. Rapid deployment.
2. No need to apply for an additional domain.
3. Convenient for sharing with others.
4. Free.

#### Cons.
1. Response slowly.
2. Limited to using only GET and POST methods.

### API List
- GET
    - `?act=categories`: Get all categories data
    - `?act=items`: Get all items data.
    - `?act=histories&user_id={userId}`: Get user's order history.
    - `?act=i18n&lng={lng}`: Get configuration json for target language.
- POST
    - `?act=checkout`: Record user orders.
    - `?act=delete_history`: Delete user order history.
