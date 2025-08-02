
export class View {
    public static VIEW_WIDTH = 1920;
    public static VIEW_HEIGHT = 1080;
    public static VIEW_WIDTH_BASE = 1920;
    public static VIEW_HEIGHT_BASE = 1080;
    public static SCALE = 1;
    public static SCALE_X =  1;
    public static SCALE_Y =  1;
    
    private static BAG_WIDTH_BASE = 64;
    public static BAG_WIDTH = 64;
    
    private static TILE_SIZE_BASE = 64;
    public static TILE_SIZE = 64;
    
    private static PLAYER_SIZE_BASE = 128;
    public static PLAYER_SIZE = 128;

    static Resize(width: number, height: number) {
        View.VIEW_WIDTH = width;
        View.VIEW_HEIGHT = height;
        View.SCALE_X = width / View.VIEW_WIDTH_BASE;
        View.SCALE_Y = height / View.VIEW_HEIGHT_BASE;
        View.SCALE = Math.max(width / View.VIEW_WIDTH_BASE, height / View.VIEW_HEIGHT_BASE);
        View.BAG_WIDTH = Math.ceil(View.BAG_WIDTH_BASE * View.SCALE_Y);
        // if(View.SCALE_X > View.SCALE_Y) {
        //     View.BAG_WIDTH = 64;
        // } else {
        //     View.BAG_WIDTH = 96;
        // }
        View.TILE_SIZE = Math.ceil(View.TILE_SIZE_BASE * View.SCALE);
        View.PLAYER_SIZE = Math.ceil(View.PLAYER_SIZE_BASE * View.SCALE);

        console.log('Resize scale:', View.SCALE, 
            ' bag_width:', View.BAG_WIDTH, 
            ' tile_size:', View.TILE_SIZE, 
            ' player_size:', View.PLAYER_SIZE)
    }
}