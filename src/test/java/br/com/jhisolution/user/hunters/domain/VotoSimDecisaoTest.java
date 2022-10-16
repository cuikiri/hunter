package br.com.jhisolution.user.hunters.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.jhisolution.user.hunters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VotoSimDecisaoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VotoSimDecisao.class);
        VotoSimDecisao votoSimDecisao1 = new VotoSimDecisao();
        votoSimDecisao1.setId(1L);
        VotoSimDecisao votoSimDecisao2 = new VotoSimDecisao();
        votoSimDecisao2.setId(votoSimDecisao1.getId());
        assertThat(votoSimDecisao1).isEqualTo(votoSimDecisao2);
        votoSimDecisao2.setId(2L);
        assertThat(votoSimDecisao1).isNotEqualTo(votoSimDecisao2);
        votoSimDecisao1.setId(null);
        assertThat(votoSimDecisao1).isNotEqualTo(votoSimDecisao2);
    }
}
