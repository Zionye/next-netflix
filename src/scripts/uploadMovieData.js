const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

(async function () {
  const movieDataText = fs.readFileSync(
    path.resolve(__dirname, `./data/movies.json`),
    "utf-8"
  );
  const movieData = JSON.parse(movieDataText);

  const datasourceUrl = process.env.DATABASE_URL;
  console.log("datasourceUrl-->", datasourceUrl);
  const prisma = new PrismaClient({
    datasourceUrl,
  });

  const movie = await prisma.movie.findFirst();
  if (movie) {
    await prisma.movie.deleteMany();
    console.log("Movie delete successfully");
  }

  const promiseAll = movieData.map(async (mov) => {
    const { title, description, videoUrl, thumbnailUrl, genre, duration } = mov;

    const result = await prisma.movie.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        genre,
        duration,
      },
    });
    return result;
  });
  console.log(`Start upload`);
  await Promise.all(promiseAll);
  console.log(`All upload successfully`);
})();
