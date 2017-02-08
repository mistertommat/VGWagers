namespace VGWagers.Models
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using System.Data.Entity.Migrations;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
using System.Collections;
    using System.Collections.Generic;
    public class VGWagersDB : DbContext
    {
        // Your context has been configured to use a 'test' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'VGWagers.Models.test' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'test' 
        // connection string in the application configuration file.
        public VGWagersDB()
            : base("name=DefaultConnection")
        {
            
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }
        public virtual DbSet<vgw_address> vgw_address { get; set; }
        public virtual DbSet<vgw_game> vgw_game { get; set; }
        public virtual DbSet<vgw_match> vgw_match { get; set; }
        public virtual DbSet<vgw_match_users_xref> vgw_match_users_xref { get; set; }
        public virtual DbSet<vgw_platform_enum> vgw_platform_enum { get; set; }
        public virtual DbSet<vgw_game_platform_xref> vgw_game_platform_xref { get; set; }
        //public virtual DbSet<vgw_role> vgw_role { get; set; }
        public virtual DbSet<vgw_tournament> vgw_tournament { get; set; }
        public virtual DbSet<vgw_tournament_format> vgw_tournament_format { get; set; }
        //public virtual DbSet<vgw_user> vgw_user { get; set; }
        public virtual DbSet<vgw_difficulty_level_enum> vgw_difficulty_level_enum { get; set; }
        public virtual DbSet<vgw_genre_enum> vgw_genre_enum { get; set; }
        public virtual DbSet<vgw_game_difficulty_level_xref> vgw_game_difficulty_level_xref { get; set; }
        public virtual DbSet<vgw_wager> vgw_wager { get; set; }
        public virtual DbSet<vgw_wager_revision> vgw_wager_revision { get; set; }
        public virtual DbSet<vgw_match_score> vgw_match_score { get; set; }
        public virtual DbSet<vgw_wager_match_xref> vgw_wager_match_xref { get; set; }
        public virtual DbSet<vgw_payment> vgw_payment { get; set; }
        public virtual DbSet<vgw_payment_method_enum> vgw_payment_method_enum { get; set; }
        public virtual DbSet<vgw_tournament_user_xref> vgw_tournament_user_xref { get; set; }
        public virtual DbSet<vgw_tournament_match_xref> vgw_tournament_match_xref { get; set; }
        public virtual DbSet<vgw_tournament_schedule> vgw_tournament_schedule { get; set; }

        public virtual DbSet<vgw_country> vgw_country { get; set; }
        public virtual DbSet<vgw_timezone> vgw_timezone { get; set; }
        public virtual DbSet<vgw_state> vgw_state { get; set; }
        
    }   

    public partial class vgw_wager
    {
        [Key]
        public int WAGERID { get; set; }
        public int GAMEID { get; set; }
        public int PLATFORMID { get; set; }
        public int DIFFICULTYLEVELID { get; set; }
        public decimal INITIALWAGERAMOUNT { get; set; }
        public decimal FINALWAGERAMOUNT { get; set; }
        public int POSTEDBYUSERID { get; set; }
        public Nullable<int> ACCEPTEDBYUSERID { get; set; }
        public System.DateTime POSTEDDATE { get; set; }
        public Nullable<System.DateTime> ACCEPTEDDATE { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_wager_revision
    {
        [Key]
        public int WAGERREVISIONID { get; set; }
        public int WAGERID { get; set; }
        public int PROPOSEDBYUSERID { get; set; }
        public decimal PROPOSEDAMOUNT { get; set; }
        public System.DateTime PROPOSEDDATE { get; set; }
        public bool ISACCEPTED { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_difficulty_level_enum
    {
        [Key]
        public int DIFFICULTYLEVELID { get; set; }
        public string DIFFICULTYLEVEL { get; set; }
        public bool ISACTIVE { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_genre_enum
    {
        [Key]
        public int GENREID { get; set; }
        public string GENRE { get; set; }
        public bool ISACTIVE { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_platform_enum
    {
        [Key]
        public int PLATFORMID { get; set; }
        public string PLATFORMNAME { get; set; }
        public bool ISACTIVE { get; set; }
        //[ForeignKey("Id")]
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_address
    {
        [Key]
        public int ADDRESSID { get; set; }
        public string ADDRESSLINE1 { get; set; }
        public string ADDRESSLINE2 { get; set; }
        public string ADDRESSLINE3 { get; set; }
        public string CITY { get; set; }
        public Nullable<int> STATEID { get; set; }
        public Nullable<int> COUNTRYID { get; set; }
        public string ZIPCODE { get; set; }
  //      [ForeignKey("Id")]
        public int USERID { get; set; }
    //    [ForeignKey("Id")]
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_game
    {
        [Key]
        public int GAMEID { get; set; }
        public string GAMENAME { get; set; }
        public byte[] GAMEIMAGE { get; set; }
      //  [ForeignKey("Id")]
        public int GENREID { get; set; }
        public bool ISACTIVE { get; set; }
        public System.DateTime RELEASEDATE { get; set; }
        public bool CANBEPLAYEDBYTEAM { get; set; }
        public int SORTORDER { get; set; }        
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
        public ICollection<vgw_game_platform_xref> AVAILABLEONPLATFORMS { get; set; }
        public ICollection<vgw_game_difficulty_level_xref> DIFFICULTYLEVELS { get; set; }
    }

    public partial class vgw_game_difficulty_level_xref
    {
        [Key]
        public int GAMEDIFFICULTYLEVELID { get; set; }
        public int DIFFICULTYLEVELID { get; set; }
        [ForeignKey("DIFFICULTYLEVELID")]
        public vgw_difficulty_level_enum vgw_difficulty_level_enum { get; set; }

        public int GAMEID { get; set; }
        [ForeignKey("GAMEID")]
        public vgw_game vgw_game { get; set; }

        public int SORTORDER { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_game_platform_xref
    {
        [Key]
        public int PLATFORMGAMEID { get; set; }

        public int PLATFORMID { get; set; }
        [ForeignKey("PLATFORMID")]
        public vgw_platform_enum vgw_platform { get; set; }
        
        public int GAMEID { get; set; }
        [ForeignKey("GAMEID")]
        public vgw_game vgw_game { get; set; }

        public bool ISACTIVE { get; set; }
        public Nullable<int> LASTUPDATEDUSERID { get; set; }

        public Nullable<System.DateTime> LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_match
    {
        //[ForeignKey("MATCHID")]
        [Key]
        public int MATCHID { get; set; }
        //[ForeignKey("GAMEID")]
        public int GAMEID { get; set; }
        //[ForeignKey("PLATFORMID")]
        public int PLATFORMID { get; set; }
        public System.DateTime STARTDATE { get; set; }
        public Nullable<System.DateTime> ENDDATE { get; set; }
        public Nullable<int> QUARTERLENGTH { get; set; }
        //[ForeignKey("Id")]
        public Nullable<int> WINNERUSERID { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_match_score
    {
        [Key]
        public int MATCHSCOREID { get; set; }
        public int MATCHID { get; set; }
        public int USERID { get; set; }
        public Nullable<decimal> SCORE { get; set; }
        public Nullable<decimal> TIMETAKEN { get; set; }
        public byte[] SCOREIMAGE { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_wager_match_xref
    {
        [Key]
        public int WAGERMATCHID { get; set; }
        public int WAGERID { get; set; }
        public int MATCHID { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_payment
    {
        [Key]
        public int PAYMENTID { get; set; }
        public System.DateTime PAYMENTDATE { get; set; }
        public int USERID { get; set; }
        public decimal AMOUNT { get; set; }
        public bool ISPAYOUT { get; set; }
        public int PAYMENTMETHODID { get; set; }
        public string PAYMENTDESCRIPTION { get; set; }
        public decimal BALANCE { get; set; }
        public int PAYMENTCARDLASTFOURDIGITS { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_payment_method_enum
    {
        [Key]
        public int PAYMENTMETHODID { get; set; }
        public string PAYMENTMETHOD { get; set; }
        public bool ISACTIVE { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public System.DateTime LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_match_users_xref
    {
        //[ForeignKey("MATCHID")]
        [Key]
        [Column(Order = 1)] 
        public int MATCHID { get; set; }

        //[ForeignKey("Id")]
        [Key]
        [Column(Order = 2)] 
        public string USERID { get; set; }
        public Nullable<decimal> SCORE { get; set; }
        public Nullable<System.DateTime> STARTTIME { get; set; }
        public Nullable<System.DateTime> ENDTIME { get; set; }
        public Nullable<bool> ISWINNER { get; set; }
        public byte[] SCOREIMAGE { get; set; }
        //[ForeignKey("Id")]
        public Nullable<int> LASTUPDATEDBYUSERID { get; set; }
        public Nullable<System.DateTime> LASTUPDATEDDATE { get; set; }
        public string TEAMNAME { get; set; }
    }
    
    public partial class vgw_tournament
    {
        [Key]
        public int TOURNAMENTID { get; set; }
        public string TITLE { get; set; }

        //[ForeignKey("PLATFORMID")]
        public int PLATFORMID { get; set; }
        //[ForeignKey("GAMEID")]
        public int GAMEID { get; set; }
       // [ForeignKey("FORMATID")]
        public int FORMATID { get; set; }
        public Nullable<decimal> ENTRYFEE { get; set; }
        public Nullable<System.DateTime> STARTDATE { get; set; }
        public Nullable<System.DateTime> ENDDATE { get; set; }
        public Nullable<System.DateTime> REGISTRATIONCLOSEDATE { get; set; }
        public string DESCRIPTION { get; set; }
        public Nullable<decimal> PRIZEAMOUNT { get; set; }
        public Nullable<int> PLAYERCOUNT { get; set; }
        public int ROUNDS { get; set; }
        public decimal TOTALBUYIN { get; set; }
        public decimal EARNINGS { get; set; }
        public int MATCHCOUNT { get; set; }
        public bool DOUBLEELIMINATION { get; set; }
       // [ForeignKey("Id")]
        public int LASTUPDATEDBYUSERID { get; set; }
        public Nullable<System.DateTime> LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_tournament_user_xref
    {
        [Key]
        public int TOURNAMENTUSERID { get; set; }
        public int TOURNAMENTID { get; set; }
        public int USERID { get; set; }
        public Nullable<System.DateTime> SIGNEDUPDATE { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public Nullable<System.DateTime> LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_tournament_match_xref
    {
        [Key]
        public int TOURNAMENTMATCHID { get; set; }
        public int TOURNAMENTID { get; set; }
        public int MATCHID { get; set; }
        public int ROUNDNUMBER { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public Nullable<System.DateTime> LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_tournament_schedule
    {
        [Key]
        public int TOURNAMENTSCHEDULEID { get; set; }
        public int TOURNAMENTID { get; set; }
        public int ROUNDNUMBER { get; set; }
        public Nullable<System.DateTime> STARTDATE { get; set; }
        public Nullable<System.DateTime> ENDDATE { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public Nullable<System.DateTime> LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_tournament_format
    {
        [Key]
        public int FORMATID { get; set; }
        public string FORMATNAME { get; set; }
        public int LASTUPDATEDBYUSERID { get; set; }
        public Nullable<System.DateTime> LASTUPDATEDDATE { get; set; }
    }

    public partial class vgw_country
    {
        [Key]
        public int COUNTRYID { get; set; }
        public string COUNTRYNAME { get; set; }
        public Nullable<System.DateTime> LASTUPDATEDDATE { get; set; }
        public Nullable<int> LASTUPDATEDBYUSERID { get; set; }
        
    }

    public partial class vgw_timezone
    {
        [Key]
        public int TIMEZONEID { get; set; }
        public bool USEDAYLIGHTTIME { get; set; }
        public int GMTDIFFERENCE { get; set; }
        public string TIMEZONENAME { get; set; }
        public Nullable<System.DateTime> LASTUPDATEDDATE { get; set; }
        public Nullable<int> LASTUPDATEDBYUSERID { get; set; }
    }

    public partial class vgw_state
    {
        [Key]
        public int STATEID { get; set; }
        public string STATENAME { get; set; }
        public Nullable<System.DateTime> LASTUPDATEDDATE { get; set; }
        public Nullable<int> LASTUPDATEDBYUSERID { get; set; }
    }
}