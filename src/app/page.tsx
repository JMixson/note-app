import Image from "next/image";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import CommunityImage from "../assets/img/community-group.jpg";

function Home() {
  return (
    <>
      <h1 className="mb-2 text-4xl font-bold">Community Notes Center</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div>
          <Image
            src={CommunityImage}
            alt="Community group"
            className="rounded-md"
          />
          <p className="text-sm underline hover:no-underline">
            <a
              target="_blank"
              href="https://www.pexels.com/photo/group-of-people-standing-inside-room-2608517/"
            >
              Photo by Matheus Bertelli
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Add a Note!</h2>
          <NoteForm />
        </div>
      </div>

      <NoteList />
    </>
  );
}

export default Home;
