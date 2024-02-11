
using Imagekit;
using Imagekit.Models;
using Imagekit.Sdk;
namespace API.Services;

public class ImageService
{
    private readonly ImagekitClient imagekit;

    public ImageService(IConfiguration config)
    {
        ImagekitClient imagekit = new ImagekitClient(
            config["Imagekit:ApiKey"],
            config["Imagekit:ApiSecret"],
            config["Imagekit:CloudName"]
        );
        this.imagekit = imagekit;
    }

    public async Task<Result> AddImageAsync(IFormFile file)
    {
        Result resp = new Result();
        if (file.Length > 0)
        {
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }
            FileCreateRequest ob = new FileCreateRequest
            {
                file = fileBytes,
                fileName = Guid.NewGuid().ToString()
            };
            ob.useUniqueFileName = true;
            ob.folder = "dummy_folder";
            ob.isPrivateFile = false;
            ob.overwriteFile = true;
            ob.overwriteAITags = true;
            ob.overwriteTags = true;
            ob.overwriteCustomMetadata = true;

            resp = await imagekit.UploadAsync(ob);
        }
        return resp;
    }

    public async Task<ResultDelete> DeleteImageAsync(string publicId)
    {

        var result = await imagekit.DeleteFileAsync(publicId);

        return result;
    }
}