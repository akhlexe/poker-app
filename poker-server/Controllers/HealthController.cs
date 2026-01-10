using Microsoft.AspNetCore.Mvc;

namespace poker_server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetHealth()
        {
            return Ok(new { status = "Healthy" });
        }
    }
}