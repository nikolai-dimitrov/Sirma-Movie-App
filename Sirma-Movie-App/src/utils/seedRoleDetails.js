export const seedRoleDetails = (data) => {
    const actorsById = Object.fromEntries(data.actors.map((currentActor) => [currentActor.ID, currentActor]));
    const moviesById = Object.fromEntries(data.movies.map((currentMovie) => [currentMovie.ID, currentMovie]));

    const seededRoles = data.roles.map((currentRole) => {
        const movieId = currentRole.MovieID;
        const actorId = currentRole.ActorID;

        currentRole["MovieDetails"] = moviesById[movieId];
        currentRole["ActorDetails"] = actorsById[actorId];

        return currentRole;
    });

    return seededRoles;
}