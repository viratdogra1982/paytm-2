
import { SendCard } from "../../../components/SendCard";

export default async function() {
    return <div className="w-full">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
          p2p Transfer
        </div>
        <div className="pt-4 w-full flex justify-center">
            <div>
                <SendCard />
            </div>

        </div>
    </div>
}