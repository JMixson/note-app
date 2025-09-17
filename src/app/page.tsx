import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <NoteForm />
        <NoteList />
      </main>
    </div>
  );
}

export default Home;
