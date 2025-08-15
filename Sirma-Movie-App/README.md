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
    5. **Using data state in context as single source of truth. CRUD operations Modifying data state in the context and then invoke build relation and seed data functions which return arrays based on modified data and i am using these arrays for rendering in components.**

-   **Home**

    1. **Using already created array with movies which are mapped with their roles to calculate who is the pair of actors who have acted in most movies together.**
    2. **Iterate over array MoviesMappedWithRole object and for each movie iterate over the roles array and create all possible combinations of concatenated actors' id pairs. Then for each id pair if this pair not exist in the object create empty array and push current movie if the pair exists push the movie to the corresponding array.**
    3. **The approach i have chosen to get top actor pair will work correct if there is only 1 top actor pair who acted in together in more movies than the others, if there are more than 1 pair with same amount of movies where they have acted in together it will return last one**

    **Actors**
    **Movies**

### **_Bonus_**

-   **Search Functionality**

    1. **For search functionality i chose this approach to debounce input value and when user stop typing set the value in the state, i am using useMemo with debounced value in dependency array to avoid unnecessary invokes of filtering function on every re-render because I think it is appropriate for this use case. I was concidering to debounc on change but i want ti avoid using use ref to save old timeout id and don’t want to repeat logic into movie and actor component for searching so i chose to implement custom hook for debouncing.**

### **_Additional Information_**

1. **Implementation of movies component and actors component is almost the same i didn’t create 1 reusable component because i want to keep the code clean without if else conditions and these 2 entities are different logic parts. Also I didn’t implement some kind of reusable hook for the add update delete functions in these components because they are very small.**
