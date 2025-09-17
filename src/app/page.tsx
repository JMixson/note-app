import Image from "next/image";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import CommunityImage from "../assets/img/community-group.jpg";

function Home() {
  return (
    <div className="mx-auto my-10 max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <main>
        <h1 className="mb-2 text-4xl font-bold">Community Notes Center</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <Image
            src={CommunityImage}
            alt="Community group"
            className="rounded-md"
          />
          <div>
            <h2 className="text-2xl font-bold">Add a Note!</h2>
            <NoteForm />
          </div>
        </div>

        <NoteList />
      </main>
    </div>
  );
}

export default Home;
