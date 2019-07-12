package tr.com.turksat.profit.rest;

import org.primefaces.model.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.turksat.profit.common.LazyDTOList;
import tr.com.turksat.profit.common.exception.DomainException;
import tr.com.turksat.profit.common.log.service.LogService;
import tr.com.turksat.profit.common.mail.MailService;
import tr.com.turksat.profit.common.persist.*;
import tr.com.turksat.profit.common.util.ProfitFacesUtil;
import tr.com.turksat.profit.model.dto.*;
import tr.com.turksat.profit.model.mapper.FirmaMapper;
import tr.com.turksat.profit.model.query.DetsisKurumQuery;
import tr.com.turksat.profit.model.query.DetsisKurumQueryModel;
import tr.com.turksat.profit.service.FirmaService;
import tr.com.turksat.profit.service.InsanKaynaklariService;
import tr.com.turksat.profit.service.ProjeYonetimiService;

import java.util.List;

@RestController
@RequestMapping("/rest/firma")
public class FirmaRestController {
    @Autowired
    private FirmaService firmaService;
    @Autowired
    private ProjeYonetimiService projeYonetimiService;
    @Autowired
    private InsanKaynaklariService insanKaynaklariService;
    @Autowired
    private LogService logService;
    @Autowired
    private MailService mailService;
    @Autowired
    private FirmaMapper firmaMapper;

    @CrossOrigin(origins = "*")
    @GetMapping("/parametre-getir")
    public ResponseEntity<List<ParametreDTO>> tumParametreDTODegerleriniGetir(
            @RequestParam String queryName) throws DomainException {
        List<ParametreDTO> parametreler = firmaService.tumParametreDTODegerleriniGetir(queryName);
        return ResponseEntity.ok(parametreler);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{firmaId}")
    public ResponseEntity<FirmaDTO> firmaDTOGetir(@PathVariable Long firmaId) {
        FirmaDTO firmaDTO = firmaService.firmaDTOGetir(firmaId);
        return ResponseEntity.ok(firmaDTO);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/firma-gorusme/{firmaGorusmeId}")
    public ResponseEntity<FirmaGorusmeDTO> firmaGorusmeDTOGetir(@PathVariable Long firmaGorusmeId) {
        FirmaGorusmeDTO firmaGorusmeDTO = firmaService.firmaGorusmeDTOGetir(firmaGorusmeId);
        return ResponseEntity.ok(firmaGorusmeDTO);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/parametre-getir/{birimId}")
    public ResponseEntity<List<ParametreDTO>> tumParametreDTODegerleriniGetir(
            @PathVariable Long birimId,
            @RequestParam String queryName) throws DomainException {
        List<ParametreDTO> parametreler = firmaService.tumParametreDTODegerleriniGetir(queryName, birimId);
        return ResponseEntity.ok(parametreler);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/firma-yetkilisi/{firmaYetkilisiId}")
    public ResponseEntity<FirmaYetkilisiDTO> firmaYetkilisiDTOGetir(@PathVariable Long firmaYetkilisiId) {
        FirmaYetkilisiDTO firmaYetkilisiDTO = firmaService.firmaYetkilisiDTOGetir(firmaYetkilisiId);
        return ResponseEntity.ok(firmaYetkilisiDTO);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{firmaId}/alt-yukleniciler")
    public ResponseEntity<List<ProjeBilgiDTO>> altYukleniciProjeProjeBilgiDTOlariGetir(@PathVariable Long firmaId) {
        List<ProjeBilgiDTO> altYukleniciProjeListesi = projeYonetimiService.altYukleniciProjeProjeBilgiDTOlariGetir(firmaId);
        return ResponseEntity.ok(altYukleniciProjeListesi);
    }

    @CrossOrigin(origins = "*")
    @GetMapping
    public ResponseEntity<List<FirmaSorguSonucuDTO>> firmaSorgula(@RequestParam Long firmaYetkilisiId) {
        List<FirmaSorguSonucuDTO> firmaDTOList = firmaService.firmaSorgula(firmaYetkilisiId);
        return ResponseEntity.ok(firmaDTOList);
    }

    @CrossOrigin(origins = "*")
    @PostMapping
    public ResponseEntity kaydet(@RequestBody FirmaDTO firmaDTO) {
        firmaService.kaydet(firmaDTO);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{firmaId}/firma-yetkilileri")
    public ResponseEntity<List<FirmaYetkilisiDTO>> getFirmaYetkilileri(@PathVariable Long firmaId) {
        List<FirmaYetkilisiDTO> firmaYetkilileri = firmaService.getFirmaYetkilileri(firmaId);
        return ResponseEntity.ok(firmaYetkilileri);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/{firmaId}/firma-yetkilisi")
    public ResponseEntity<FirmaYetkilisiDTO> firmaYetkilisiKaydet(@PathVariable Long firmaId, @RequestBody FirmaYetkilisiDTO firmaYetkilisiDTO) {
        firmaService.firmaYetkilisiKaydet(firmaId, firmaYetkilisiDTO);
        return ResponseEntity.ok(firmaYetkilisiDTO);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/firma-yetkilisi/{firmaYetkilisiId}")
    public ResponseEntity firmaYetkilisiSil(@PathVariable Long firmaYetkilisiId) {
        firmaService.firmaYetkilisiSil(firmaYetkilisiId);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{firmaId}/firma-urun-hizmetleri")
    public ResponseEntity<List<FirmaUrunHizmetDTO>> getFirmaUrunHizmetleri(@PathVariable Long firmaId) {
        List<FirmaUrunHizmetDTO> firmaUrunHizmetleri = firmaService.getFirmaUrunHizmetleri(firmaId);
        return ResponseEntity.ok(firmaUrunHizmetleri);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/{firmaId}/urun-hizmet")
    public ResponseEntity<Long> firmaUrunHizmetKaydet(@PathVariable Long firmaId, @RequestBody FirmaUrunHizmetDTO firmaUrunHizmetDTO) {
        firmaService.firmaUrunHizmetKaydet(firmaId, firmaUrunHizmetDTO);
        return ResponseEntity.ok(firmaUrunHizmetDTO.getId());
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/urun-hizmet/{firmaUrunHizmetId}")
    public ResponseEntity firmaUrunHizmetSil(@PathVariable Long firmaUrunHizmetId) {
        firmaService.firmaUrunHizmetSil(firmaUrunHizmetId);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{firmaId}/firma-projeleri")
    public ResponseEntity<List<FirmaProjeDTO>> getFirmaProjeleri(@PathVariable Long firmaId) {
        List<FirmaProjeDTO> firmaProjeleri = firmaService.getFirmaProjeleri(firmaId);
        return ResponseEntity.ok(firmaProjeleri);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/firma-proje/{firmaProjeId}")
    public ResponseEntity firmaProjeSil(@PathVariable Long firmaProjeId) {
        firmaService.firmaProjeSil(firmaProjeId);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/{firmaId}/firma-proje")
    public ResponseEntity<Long> firmaProjeKaydet(@PathVariable Long firmaId, @RequestBody FirmaProjeDTO firmaProjeDTO) {
        firmaService.firmaProjeKaydet(firmaId, firmaProjeDTO);
        return ResponseEntity.ok(firmaProjeDTO.getId());
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/projeler")
    public ResponseEntity<List<ParametreDTO>> tumProjeBilgiDTOGetir(@RequestParam String orderProperty, @RequestParam OrderType orderType) {
        OrderData orderData = new OrderData(orderProperty, orderType);
        //todo birim parametre olarak eklenmeli
        List<ParametreDTO> parametreDTOList = projeYonetimiService.tumProjeBilgiDTOGetir(null);
        return ResponseEntity.ok(parametreDTOList);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/personel/{personelId}")
    public ResponseEntity<PersonelBilgiDTO> personelDTOGetir(@PathVariable Long personelId) {
        PersonelBilgiDTO personelBilgiDTO = insanKaynaklariService.personelDTOGetir(personelId);
        return ResponseEntity.ok(personelBilgiDTO);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/proje/{projeId}")
    public ResponseEntity<ProjeBilgiDTO> projeBilgiDTOGetir(@PathVariable Long projeId) {
        ProjeBilgiDTO projeBilgiDTO = projeYonetimiService.projeBilgiDTOGetir(projeId);
        return ResponseEntity.ok(projeBilgiDTO);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/log")
    public ResponseEntity createLog(@RequestBody LogDTO log) {
        logService.createFirmaLog(log);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/firma-urun-hizmet-eki")
    public ResponseEntity firmaUrunHizmetEkleriniKaydet(@RequestBody List<DokumanDTO> dokumanDTOList) {
        firmaService.firmaUrunHizmetEkleriniKaydet(dokumanDTOList);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{firmaId}/firma-dokumanlari")
    public ResponseEntity<List<DokumanDTO>> getFirmaDokumanlari(@PathVariable Long firmaId) {
        List<DokumanDTO> firmaDokumanlari = firmaService.getFirmaDokumanlari(firmaId);
        return ResponseEntity.ok(firmaDokumanlari);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/{firmaId}/firma-dokumanlari")
    public ResponseEntity firmaDokumanlariKaydet(@PathVariable Long firmaId, @RequestBody List<DokumanDTO> dokumanDTOList) {
        firmaService.firmaDokumanlariKaydet(firmaId, dokumanDTOList);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/firma-dokumanlari-sil")
    public ResponseEntity firmaDokumanlariSil(@RequestBody List<Long> firmaDokumanIdler) {
        firmaService.firmaDokumanlariSil(firmaDokumanIdler);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/html-mail")
    public ResponseEntity htmlMailGonder(@RequestParam String to, @RequestParam String subject, @RequestParam String msg) {
        mailService.htmlMailGonder(to, subject, msg);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/query-lazy-list")
    public ResponseEntity<LazyDTOList<DetsisKurumDTO>> queryLazyList(@RequestBody QueryModel queryModel) {
        if (queryModel instanceof DetsisKurumQueryModel) {
            DetsisKurumQuery query = new DetsisKurumQuery((DetsisKurumQueryModel) queryModel);
            LazyList lazyList = firmaService.queryLazyList(query);
            List dataList = lazyList.getDataList();
            LazyDTOList lazyDTOList = new LazyDTOList();
            lazyDTOList.setRowCount(lazyList.getRowCount());
            lazyDTOList.setDataList(firmaMapper.detsisKurumToDTOList(dataList));
            return ResponseEntity.ok((LazyDTOList<DetsisKurumDTO>) lazyDTOList);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/kurum_query-lazy-list")
    public ResponseEntity<LazyDTOList<DetsisKurumDTO>> kurumQueryLazyList(
            @RequestParam String sorgu, @RequestParam Integer firstRecord, @RequestParam Integer pageSize) {
        DetsisKurumQueryModel queryModel = new DetsisKurumQueryModel();
        queryModel.setFirstRecord(firstRecord);
        queryModel.setPageSize(pageSize);
        queryModel.setAd(sorgu);
        queryModel.setSortField("ad");
        queryModel.setSortOrder(SortOrder.ASCENDING);
        DetsisKurumQuery query = new DetsisKurumQuery(queryModel);
        LazyList lazyList = firmaService.queryLazyList(query);
        List dataList = lazyList.getDataList();
        LazyDTOList lazyDTOList = new LazyDTOList();
        lazyDTOList.setRowCount(lazyList.getRowCount());
        lazyDTOList.setDataList(firmaMapper.detsisKurumToDTOList(dataList));
        return ResponseEntity.ok((LazyDTOList<DetsisKurumDTO>) lazyDTOList);

        /*http://localhost/rest/firma/kurum_query-lazy-list?sorgu=Ankara&firstRecord=0&pageSize=20*/
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/dokuman-icerik/{icerikId}")
    public ResponseEntity<IcerikDTO> getIcerikDTO(@PathVariable Long icerikId) {
        IcerikDTO icerikDTO = firmaService.getIcerikDTO(icerikId);
        return ResponseEntity.ok(icerikDTO);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("/aktivasyon-kontrol")
    public ResponseEntity<String> aktivasyonKodunuKontrolEt(@RequestParam String aktivasyonKodu) {
        String eposta = firmaService.aktivasyonKodunuKontrolEt(aktivasyonKodu);
        return ResponseEntity.ok(eposta);
    }

}
