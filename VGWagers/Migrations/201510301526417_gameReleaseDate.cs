namespace VGWagers.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class gameReleaseDate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.vgw_game", "RELEASEDATE", c => c.DateTime(nullable: false, precision: 0));
        }
        
        public override void Down()
        {
            DropColumn("dbo.vgw_game", "RELEASEDATE");
        }
    }
}
