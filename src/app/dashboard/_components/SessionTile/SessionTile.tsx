import type { Session } from "lucia";
import SessionTileCurrent from "./SessionTileCurrent";
import SessionTileIdWithToolTip from "./SessionTileIdWithToolTip";
import SessionTileData from "./SessionTileData";

type Props = {
    session: Session;
    isCurrent: boolean;
};

export default function SessionTile({ session, isCurrent }: Props) {
    return (
        <div className="w-full rounded-md border-2 bg-white p-4 text-copy">
            <div className="flex flex-row items-center justify-between">
                <SessionTileIdWithToolTip id={session.id} />
                <div className="">test</div>
            </div>
            <div className="flex flex-row items-end justify-between">
                <SessionTileData session={session} />
                {isCurrent && <SessionTileCurrent />}
            </div>
        </div>
    );
}
