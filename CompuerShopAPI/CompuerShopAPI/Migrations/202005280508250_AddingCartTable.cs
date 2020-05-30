namespace CompuerShopAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingCartTable : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Carts", "ID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Carts", "ID", c => c.Int(nullable: false));
        }
    }
}
