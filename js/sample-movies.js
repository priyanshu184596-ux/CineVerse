/**
 * Sample Movie Data
 * Contains hardcoded movie data for demo/fallback purposes
 */

const SAMPLE_MOVIES = {
  featured: {
    id: 550,
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    rating: 8.8,
    backdrop:
      "https://image.tmdb.org/t/p/w1280/fzmFj8f59HE6d2zV4aqFvPo1fSt.jpg",
    poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMPA5TNTj7SAKlnA7K.jpg",
    releaseDate: "1999-10-15",
    runtime: 139,
    genres: ["Drama", "Thriller"],
    cast: [
      {
        id: 1,
        name: "Brad Pitt",
        character: "Tyler Durden",
        profile_path: "/cckcYc2v0yh1tc9QjReluxhhCOd.jpg",
      },
      {
        id: 2,
        name: "Edward Norton",
        character: "The Narrator",
        profile_path: "/ewUqvzVCuooalHHcNw24w6nDjkm.jpg",
      },
      {
        id: 3,
        name: "Helena Bonham Carter",
        character: "Marla Singer",
        profile_path: "/p2w4x3pLSDPLVxg5ow4iNEaLbQp.jpg",
      },
    ],
    videos: [
      {
        id: 1,
        key: "dQw4w9WgXcQ",
        type: "Trailer",
        name: "Official Trailer",
        site: "YouTube",
      },
    ],
  },

  trending: [
    {
      id: 550,
      title: "Fight Club",
      rating: 8.8,
      poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMPA5TNTj7SAKlnA7K.jpg",
      releaseDate: "1999-10-15",
      genres: ["Drama", "Thriller"],
    },
    {
      id: 278,
      title: "The Shawshank Redemption",
      rating: 9.3,
      poster: "https://image.tmdb.org/t/p/w500/q6y0Go1TSiQciulq4grI2cqqT5b.jpg",
      releaseDate: "1994-09-23",
      genres: ["Drama"],
    },
    {
      id: 238,
      title: "The Godfather",
      rating: 9.2,
      poster: "https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7SXZF3O0C.jpg",
      releaseDate: "1972-03-24",
      genres: ["Crime", "Drama"],
    },
    {
      id: 240,
      title: "The Godfather Part II",
      rating: 9.0,
      poster: "https://image.tmdb.org/t/p/w500/hHdDxVPpEfRq9GXWH8A2z6XP7Gf.jpg",
      releaseDate: "1974-12-20",
      genres: ["Crime", "Drama"],
    },
    {
      id: 944,
      title: "Metropolis",
      rating: 8.3,
      poster: "https://image.tmdb.org/t/p/w500/lUdZIaAh9C2y5C3f0bPOLagaMRH.jpg",
      releaseDate: "1927-01-10",
      genres: ["Sci-Fi", "Drama"],
    },
    {
      id: 11216,
      title: "Inception",
      rating: 8.8,
      poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDMNNGQByStJ0wgiP1A.jpg",
      releaseDate: "2010-07-16",
      genres: ["Sci-Fi", "Thriller"],
    },
  ],

  topRated: [
    {
      id: 278,
      title: "The Shawshank Redemption",
      rating: 9.3,
      poster: "https://image.tmdb.org/t/p/w500/q6y0Go1TSiQciulq4grI2cqqT5b.jpg",
      releaseDate: "1994-09-23",
      genres: ["Drama"],
    },
    {
      id: 238,
      title: "The Godfather",
      rating: 9.2,
      poster: "https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7SXZF3O0C.jpg",
      releaseDate: "1972-03-24",
      genres: ["Crime", "Drama"],
    },
    {
      id: 240,
      title: "The Godfather Part II",
      rating: 9.0,
      poster: "https://image.tmdb.org/t/p/w500/hHdDxVPpEfRq9GXWH8A2z6XP7Gf.jpg",
      releaseDate: "1974-12-20",
      genres: ["Crime", "Drama"],
    },
    {
      id: 429422,
      title: "Parasite",
      rating: 8.6,
      poster: "https://image.tmdb.org/t/p/w500/7IiTHtUmuYukarD51ZlIHVUVd52.jpg",
      releaseDate: "2019-05-30",
      genres: ["Drama", "Thriller"],
    },
  ],

  action: [
    {
      id: 680,
      title: "Pulp Fiction",
      rating: 8.9,
      poster: "https://image.tmdb.org/t/p/w500/plnlrtTVnEsSmOe41efqGXFVTnG.jpg",
      releaseDate: "1994-10-14",
      genres: ["Crime", "Drama"],
    },
    {
      id: 1891,
      title: "The Dark Knight",
      rating: 9.0,
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haI0xvwi.jpg",
      releaseDate: "2008-07-18",
      genres: ["Action", "Crime", "Drama"],
    },
    {
      id: 244786,
      title: "John Wick",
      rating: 7.8,
      poster: "https://image.tmdb.org/t/p/w500/2PCgqJssaA7VYJ2gO9e4jNHfIqT.jpg",
      releaseDate: "2014-10-24",
      genres: ["Action", "Crime", "Thriller"],
    },
    {
      id: 68721,
      title: "Gladiator",
      rating: 8.5,
      poster: "https://image.tmdb.org/t/p/w500/r2FAcPzkIrkw3PCMorao94XnotG.jpg",
      releaseDate: "2000-05-05",
      genres: ["Action", "Adventure", "Drama"],
    },
  ],

  comedy: [
    {
      id: 489,
      title: "Good Will Hunting",
      rating: 8.3,
      poster: "https://image.tmdb.org/t/p/w500/c2z8gaSMygEO2tEjJyZDR7RzG4T.jpg",
      releaseDate: "1997-12-05",
      genres: ["Comedy", "Drama"],
    },
    {
      id: 9365,
      title: "Forrest Gump",
      rating: 8.8,
      poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr63OnsrWDxUD1c.jpg",
      releaseDate: "1994-07-06",
      genres: ["Comedy", "Drama", "Romance"],
    },
    {
      id: 862,
      title: "Toy Story",
      rating: 8.3,
      poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
      releaseDate: "1995-11-22",
      genres: ["Animation", "Comedy", "Family"],
    },
    {
      id: 278927,
      title: "Paddington 2",
      rating: 8.0,
      poster: "https://image.tmdb.org/t/p/w500/nnKJbsCn3xhWvNvQjf4H7bR8NDB.jpg",
      releaseDate: "2017-11-10",
      genres: ["Adventure", "Comedy", "Family"],
    },
  ],

  scifi: [
    {
      id: 11216,
      title: "Inception",
      rating: 8.8,
      poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDMNNGQByStJ0wgiP1A.jpg",
      releaseDate: "2010-07-16",
      genres: ["Sci-Fi", "Thriller"],
    },
    {
      id: 278,
      title: "Interstellar",
      rating: 8.6,
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      releaseDate: "2014-11-07",
      genres: ["Adventure", "Drama", "Sci-Fi"],
    },
    {
      id: 157336,
      title: "Interstellar",
      rating: 8.6,
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      releaseDate: "2014-11-07",
      genres: ["Adventure", "Drama", "Sci-Fi"],
    },
    {
      id: 671,
      title: "Harry Potter and the Philosopher's Stone",
      rating: 7.6,
      poster: "https://image.tmdb.org/t/p/w500/wSXwIcYa8CjyBz2nKAeLi3h6rIq.jpg",
      releaseDate: "2001-11-04",
      genres: ["Adventure", "Family", "Fantasy"],
    },
  ],

  horror: [
    {
      id: 278,
      title: "The Shining",
      rating: 8.4,
      poster: "https://image.tmdb.org/t/p/w500/8jUbQG4fFF6uxV7aXBJxr8bAypm.jpg",
      releaseDate: "1980-05-23",
      genres: ["Drama", "Horror"],
    },
    {
      id: 19995,
      title: "Avatar",
      rating: 7.8,
      poster: "https://image.tmdb.org/t/p/w500/tcD2mfpG7egsXp8Z7kpF06dfqQc.jpg",
      releaseDate: "2009-12-18",
      genres: ["Action", "Adventure", "Sci-Fi"],
    },
    {
      id: 129,
      title: "Spirited Away",
      rating: 8.6,
      poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5GZkDo21QQvD42O2l.jpg",
      releaseDate: "2001-07-20",
      genres: ["Animation", "Adventure", "Comedy"],
    },
    {
      id: 278863,
      title: "Joker",
      rating: 8.4,
      poster: "https://image.tmdb.org/t/p/w500/udDclJg1D7wSwBp9V2yI0ZY0K8O.jpg",
      releaseDate: "2019-10-04",
      genres: ["Crime", "Drama", "Thriller"],
    },
  ],
};

// Export for use in modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = SAMPLE_MOVIES;
}
