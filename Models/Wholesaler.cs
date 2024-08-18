using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class Wholesaler
{
    public int Wid { get; set; }

    public string? Fname { get; set; } = null!;

    public string? Lname { get; set; } = null!;

    public string? Address { get; set; } = null!;

    public int? Cityid { get; set; }

    public string GstNo { get; set; } = null!;

    public int? Uid { get; set; }

    public string? Email { get; set; } = null!;

    public long? MobileNo { get; set; }

    public virtual User? UidNavigation { get; set; }
    public virtual ICollection<Cart>? Carts { get; set; } = new List<Cart>();

    public virtual City? City { get; set; }=null;

    public virtual ICollection<Payment>? Payments { get; set; } = new List<Payment>();

}
