using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class Farmer
{
    public int Fid { get; set; }

    public string? Fname { get; set; } = null!;

    public string? Lname { get; set; } = null!;

    public long? AadharNo { get; set; } = null!;

    public string? Address { get; set; } = null!;

    public int? Cityid { get; set; }

    public int? Uid { get; set; }

    public string? Email { get; set; } = null!;

    public long? MobileNo { get; set; }

    public virtual City? City { get; set; } = null!;

    public virtual ICollection<ProductFarmer>? ProductFarmers { get; set; } = new List<ProductFarmer>();

    public virtual User? UidNavigation { get; set; } = null!;
}
