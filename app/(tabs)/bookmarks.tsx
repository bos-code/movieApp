import { AppBar, ScreenWrapper } from "@/components/common";
import MovieCard from "@/components/MovieCard/movieCard";

function Bookmarks() {
  return (
    <ScreenWrapper>
      <AppBar title="Bookmarks" />
      <MovieCard />
    </ScreenWrapper>
  );
}

export default Bookmarks;
