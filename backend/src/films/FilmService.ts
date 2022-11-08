import BaseService from "../BaseService";

export default class FilmService extends BaseService {
  public async getFimById(id: number) {
    return await this.prisma.film.findFirst({ where: { id } });
  }

  public async getFilmsByParams(
    name?: string,
    genres?: string,
    year?: number,
    pagination: number = 5
  ) {
    return await this.prisma.film.findMany({
      take: pagination,
      where: {
        year: year,
        name_russian: { search: name },
        description: { search: name },
        genres: { search: genres },
        
      },
    });
  }

  public async getUniqueYears() {

    const allYears = await this.prisma.film.findMany({
      select: {
        year: true,
      },
    });

    const uniqueYears = Array.from(
      new Set(allYears.map((yearObj) => yearObj.year))
    );
    return uniqueYears;
  }

  public async getUniqueGenres() {
    const allGenress = await this.prisma.film.findMany({
      select: {
        genres: true,
      },
    });

    const genress = allGenress.reduce((acc: any, velue) => {
      if (typeof velue.genres === "string") {
        acc.push(...velue.genres.split(" "));
      }

      return acc;
    }, []);

    return Array.from(new Set(genress));
  }

}
