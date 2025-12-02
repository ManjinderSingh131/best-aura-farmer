import { Link } from "react-router-dom"

export const HomeCta = () => {
    return <div className="font-bold text-slate-800">
        Who do you think is the biggest aura farmer in the world?
        Is it Piccolo? or Michael Jackson? or someone else?
        <div className="flex items-center gap-2 justify-center">
            <Link to="/aura-farmers" className="text-white bg-green-700 px-4 py-2 rounded-lg">Vote Now</Link>
        </div>
    </div>
}