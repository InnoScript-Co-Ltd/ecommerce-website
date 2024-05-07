'use client'

import { paths } from "@/constant/paths";
import { useRouter } from "next/navigation"

const shopDetail = () => {

    const router = useRouter();

    return (
        <>
            <div className=" w-full h-[64px] bg-grey px-[20px] md:px-[30px] py-[10px] flex-between">

                <div className="text-white font-bold text-[16px] leading-[19px]">
                    <h1>Potter ipsum wand elf parchment</h1>
                </div>

                <div>
                    <button
                    onClick={() => router.push(paths.lisiting)}
                    className=" w-[117px] h-[44px] font-bold text-[16px] leading-[19px] bg-black text-white rounded-full  transition duration-150 ease-in-out hover:bg-primary-accent-200 hover:shadow-lg active:bg-slate-50 active:text-primary active:shadow-md motion-reduce:transition-none">
                        BUY NOW
                    </button>
                </div>

            </div>

            <div className=" w-full h-[700px] bg-shop-detail-one-bg bg-cover object-cover flex-center">

                <div className=" w-[600px] text-white">

                    <p className=" text-center font-normal text-[20px] leading-[25px] md:leading-[19px]">Potter ipsum wand elf parchment</p>

                    <h1 className=" text-center font-bold text-[30px] md:text-[49.9px] leading-[40px] md:leading-[59.87px]">The Wide Leg Indigo Pant</h1>

                </div>

            </div>

            <div className=" w-full h-auto lg:h-[500px] bg-shop-detail-gradient px-[50px] py-[30px] lg:ps-0 flex flex-col lg:flex-row gap-3 lg:flex-center">

                <div className=" w-full lg:w-[40%] text-white">
                    <h1 className=" font-normal text-[40px] md:text-[49.9px] leading-[40px] md:leading-[59px]">
                        Potter ipsum wand elf parchment wingardium.
                    </h1>
                </div>

                <div className=" w-full lg:w-[40%] text-white">
                    <p className=" font-normal text-[20px] leading-[25px] md:leading-[19px]">
                        Potter ipsum wand elf parchment wingardium. Years lived troll he green seeker niffler soul side sinistra. Train potion horn good krum nose. Fire-whisky head glory should spells. Raw-steak eeylops fire remembrall lady thirsty butter muggle-born nose ravenclaw. Peruvian-night-powder wizard years downfall releases stairs scales. Mudbloods armchairs restricted twin match. Plums prongs smile centaur gillywater hippogriffs gobbledegook portkey.
                        Woes dress nose trevor parvati nick requirement follow wand. Holyhead three-headed counter-clockwise kiss catherine wave leg. Not would knickerbocker stand our phials for side red. Sir dog black tears feast knut them goblet chalice points. Beaters feast bertie forest parseltongue. Padma motorcycle knickerbocker blubber red totalus snargaluff. Plums witch muggle-born 9¾ drills marauder’s remember telescope. Yer smile werewolf or head flying woes remus portkey dress. Elf thestral kedavra trelawney cars duel time-turner. Oddment carriages cakes red trace erumpent no you’ve stand every. Requirement dog feint hats side-along holly. Orbs 12 half-moon-glasses frisbees betrayal stunning forest fire-whisky palominos. That bertie galleons snare hexed be come portkey lupin. This horseless flat splinched you’ve. Fenrir prince shrieking swiveling snivellus charm trunks 20 snitch.
                    </p>

                </div>


            </div>

            <div className=" w-full h-[775px] text-white bg-shop-detail-two-bg bg-cover object-cover flex-center">

                <div className=" w-full md:w-[700px] lg:w-[1100px] h-auto lg:h-[400px] px-[50px] py-[30px]">

                    <h3 className=" font-normal text-[30px] md:text-[39px] leading-[35px] md:leading-[46px]">
                        We’re working with U.S. based manufacturers to keep our <br />
                        <span className=" lg:text-center">carbon footprint as low as possible.</span>

                        <br />
                        Each bottle is shipped in a vessel of mycelium and agricultural
                        <br />
                        waste that grows in a week and decomposes in about 45 days,
                    </h3>

                    <p className=" text-center text-[20px] md:text-[13px] mt-[50px] font-normal leading-[30px] md:leading-[15px]">Our ingredients are biodegradable to keep our waterways as clean as possible.</p>

                </div>

            </div>

            <div className=" w-full h-auto md:h-[630px] bg-shop-detail-desgin-gradient text-white flex-center">

                <div className=" w-[380px] md:w-[600px] px-[30px] py-[30px]">

                    <h1 className=" font-normal text-[39px] leading-[46px]">
                        Train potion horn good krum nose.
                        Fire-whisky head glory should <br className=" hidden md:block" /> spells.
                    </h1>

                    <p className=" font-normal text-[20px] leading-[25px] md:leading-[19px] mt-[30px]">
                        Potter ipsum wand elf parchment wingardium. Years lived troll he green seeker niffler soul side sinistra. Train potion horn good krum nose. Fire-whisky head glory should spells. Raw-steak eeylops fire remembrall lady thirsty butter muggle-born nose ravenclaw. Peruvian-night-powder wizard years downfall releases stairs scales. Mudbloods armchairs restricted twin match. Plums prongs smile centaur gillywater hippogriffs gobbledegook portkey. Woes dress nose trevor parvati nick requirement follow wand. Holyhead three-headed counter-clockwise kiss catherine wave leg. Not would knickerbocker stand our phials for side red. Sir dog black tears feast knut them goblet chalice points. Beaters feast bertie forest parseltongue. Padma motorcycle knickerbocker blubber red totalus snargaluff. Plums witch muggle-born 9¾ drills marauder’s remember telescope. Yer smile werewolf or head flying woes remus portkey dress. Elf thestral kedavra trelawney cars duel time-turner. Oddment carriages cakes red trace erumpent no you’ve stand every. Requirement dog feint hats side-along holly. Orbs 12 half-moon-glasses frisbees betrayal stunning forest fire-whisky palominos. That bertie galleons snare hexed be come portkey lupin. This horseless flat splinched you’ve. Fenrir prince shrieking swiveling snivellus charm trunks 20 snitch.
                    </p>

                </div>

            </div>

            <div className=" w-full h-[1200px] md:h-[888px] flex flex-col md:flex-row md:flex-between">

                <div className=" w-full md:w-[50%] h-full bg-shop-detail-three-bg bg-cover object-cover">

                </div>

                <div className=" w-full md:w-[50%] h-full bg-shop-detail-four-bg bg-cover object-cover">

                </div>

            </div>

        </>
    )

}

export default shopDetail