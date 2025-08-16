# **Movie Cast**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## **Summary**

<!-- ### TODO: -->

### **_Main Task_**

-   **Fetching whole data when app start and then create relations.**

    1. **Create array with role objects and seed detailed information for movie and actor, for seeding roles function i chose to create two objects with actors and movies where key is the id of the entity and value is the entity object to avoid nested loops**
    2. **Create array with objects where each movie contains property roles which is array and it contains role objects which are seeded with detailed information.**
    3. **Create array with objects where each actor contains property roles which is array and it contains role objects which are seeded with detailed information.**
    4. **I chose to fetch data and create all relations in context because when app start movies and home component share same data.I build also the actors relations in context although the user may not visit the actors page but i prefer to keep the data and building all relations in the context instead of putting actors relation functionality in the actors component and later for actors crud operations have to pass data state setter to actor component.**
    5. **ServerError state will be filled with error message only if user try to create movie or actor with already existing name.**

-   **Home**
    1. On the Home page are shown names of two actors who acted in most films together and list of films where they acted in and also the films count.
    2. **Using already created array with movies which are mapped with their roles to calculate who is the pair of actors who have acted in most movies together.**
    3. **Iterate over array MoviesMappedWithRole object and for each movie iterate over the roles array and create all possible combinations of concatenated actors' id pairs. Then for each id pair if this pair not exist in the object create empty array and push current movie if the pair exists push the movie to the corresponding array.**
    4. **The approach i have chosen to get top actor pair will work correct if there is only 1 top actor pair who acted in together in more movies than the others, if there are more than 1 pair with same amount of movies where they have acted in together it will return last one**

-   **Actors**
    1. **When user click on actor name will see detailed information for this actor - his birth date and also movies where he played in and roles.**
    2. **Can not open detailed information for more than 1 entity at the same time.**
    3. **Added overflow: auto for actor name and for every movie and role description into actor details to prevent broking the layout if long text is providen.

-   **Common for Movies and Actors**
    1. **I am using same form for create and update. When user click on edit icon current entity's data will be filled in the form. If user want to cancel updating without any changes have to click again on update icon.**
    2. **There is very simple validation if some of form fields is empty user can’t submit the form.**

### **_Bonus_**

-   **Search Functionality**
    1. **For search functionality i chose this approach to debounce input value and when user stop typing set the value in the state, i am using useMemo with debounced value in dependency array to avoid unnecessary invokes of filtering function on every re-render because I think it is appropriate for this use case. I was considering to debounce onChange but i want to avoid using use ref to save old timeout id and don’t want to repeat logic into movie and actor component for searching so i chose to implement custom hook for debouncing.**

-   **Actors and Movies CRUD operations**
    1. **Using data state in context as single source of truth. CRUD operations Modifying data state in the context and then invoke build relation and seed roles functions which return arrays based on modified data and i am using these arrays for rendering in components.**

### **_Additional Information_**

1. **Implementation of movies component and actors component is almost the same i didn’t create 1 reusable component because i want to keep the code clean without if else conditions and these 2 entities are different logic parts. Also I didn’t implement some kind of reusable hook for the add update delete functions in these components because they are very small.**

### **_TODOS_**

-   **Improvements after exam check**
    1. **CSS is almost the same for actors and movies pages. Refactor css classes naming.**
    2. **Refactor build relations function - replace nested filter in foreach loop with another approach to avoid nested loops for bigger data.**
    3. **Add validation for dummy strings with special characters and etc.**
    4. **Create better ui with animations, images for the whole pages.**
    5. **Create layout for not matching search term and another one for the case when there aren’t any actors or movies.**