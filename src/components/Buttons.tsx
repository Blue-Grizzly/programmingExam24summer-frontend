export default function Buttons({ onSelected }: { onSelected: (selected: string) => void }) {

        return (
          <>
            <button className="btn-w100" onClick={() => onSelected("welcome")}>
                Home
            </button>
            <button className="btn-w100" onClick={() => onSelected("athletes")}>
                Athletes
            </button>
            <button className="btn-w100" onClick={() => onSelected("athletesForm")}>
                Add/Edit Athlete
            </button>
            <button className="btn-w100" onClick={() => onSelected("results")}>
                Results
            </button>
            <button className="btn-w100" onClick={() => onSelected("resultsForm")}>
                Add/Edit result
            </button>
            <button className="btn-w100" onClick={() => onSelected("disciplines")}>
                Disciplines
            </button>
            <button className="btn-w100" onClick={() => onSelected("disciplinesForm")}>
                Add/Edit discipline
            </button>
          </>
        );

}