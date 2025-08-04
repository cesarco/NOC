interface CheckServiceUseCase{
    execute( url: string ):Promise<boolean>;
}

type successCallback = () => void;
type ErrorCallback = (error:string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: successCallback,
        private readonly errorCallback: ErrorCallback
    ) {

    }

    public async execute( url:string ): Promise<boolean> {

        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error(`Failed to fetch ${url}: ${req.statusText}`);
            }
            this.successCallback();
            return true;
        } catch (error) {
            console.error("Error checking URL:", error);
            this.errorCallback(error instanceof Error ? error.message : "Unknown error");
            return false;
            
        }
    }
}