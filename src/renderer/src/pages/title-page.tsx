import { Button } from "@renderer/components/ui/button";
import { Card, CardContent } from "@renderer/components/ui/card";
import NavBar from "@renderer/containers/nav-bar";

export default function TitlePage() {
    return (
        <>
            <NavBar />

            <main className="h-screen flex justify-center items-center">
                <Card>
                    <CardContent className="flex flex-col gap-2">
                        <Button>Sorters</Button>
                        <Button>Viewers</Button>
                        <Button>Changelogs</Button>
                        <Button>Settings</Button>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}